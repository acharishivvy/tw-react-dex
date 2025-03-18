import { useEffect, useState } from "react";
import { MainClient } from "pokenode-ts";
import { Button } from "./ui/button";

export default function Pokedex() {
  const [pokedex, setPokedex] = useState<any>(null);
  const [pokemon, setPokemon] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const api = new MainClient({ logs: true });

  // Function to fetch Pokémon data by ID
  const getPokemonByName = async (name: string) => {
    try {
      // Fetch Pokémon data by ID
      const fetchedPokemon = await api.pokemon.getPokemonByName(name);

      // Set the fetched Pokémon state
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

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon || !pokedex) {
    return <div>Loading...</div>;
  }

  const handlePokemonClick = (name: string) => {
    setPokemon(null); // Clear previous Pokémon data to show loading state
    getPokemonByName(name);
  };

  //Runs the pokedex fetching first, then when the
  //pokemon is clicked it fetches that particular pokemon to display some information about it.
  return (
    <div>
      {pokedex.results.map((result: any) => (
        <Button key={result.id} onClick={() => handlePokemonClick(result.name)}>
          {result.name}
        </Button>
      ))}
      <hr />
      <h1>{pokemon.name}</h1>
      <p>ID: {pokemon.id}</p>
      <p>
        Types: {pokemon.types.map((type: any) => type.type.name).join(", ")}
      </p>
      <p>Height: {pokemon.height} decimeters</p>
      <p>Weight: {pokemon.weight} hectograms</p>
      <p>{pokedex.count}</p>
    </div>
  );
}
