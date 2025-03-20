import { useEffect, useState } from "react";
import { MainClient } from "pokenode-ts";
import { Button } from "./ui/button";
import Pokemon from "./Pokemon";

export default function Pokedex() {
  const [pokedex, setPokedex] = useState<any>(null);
  const [pokemon, setPokemon] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const api = new MainClient({ logs: true });

  const getPokemonByName = async (name: string) => {
    try {
      const fetchedPokemon = await api.pokemon.getPokemonByName(name);
      setPokemon(fetchedPokemon);
    } catch (err) {
      setError("Error fetching Pokémon data");
      console.error("Error fetching Pokémon data:", err);
    }
  };

  useEffect(() => {
    const getPokedex = async (offset: number, limit: number) => {
      try {
        const fetchedPokedex = await api.pokemon.listPokemons(offset, limit);
        console.log(fetchedPokedex);
        setPokedex(fetchedPokedex);
      } catch (error) {
        setError("error getting pokedex");
        console.log("pokedex error");
      }
    };

    getPokedex(0, 15); // Fetch first 15 Pokémon
  }, []);

  useEffect(() => {
    if (pokedex && pokedex.results.length > 0) {
      getPokemonByName(pokedex.results[0].name);
    }
  }, [pokedex]);

  const handlePokemonClick = (name: string) => {
    setPokemon(null); // Clear previous Pokémon data to show loading state
    getPokemonByName(name);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon || !pokedex) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {pokedex.results.map((result: any, idx: number) => (
        <Button key={idx} onClick={() => handlePokemonClick(result.name)}>
          <img
            src={
              `https://img.pokemondb.net/sprites/home/normal/` +
              result.name +
              `.png`
            }
            width={90}
            height={80}
          />
        </Button>
      ))}
      <hr />
      {/* {Pokemon(pokemon, api)} */}
      <p>{pokedex.count}</p>
    </div>
  );
}
