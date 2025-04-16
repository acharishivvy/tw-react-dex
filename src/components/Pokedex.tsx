/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MainClient } from "pokenode-ts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Pokemon from "./Pokemon";

export default function Pokedex() {
  const [pokedex, setPokedex] = useState<any>(null);
  const [pokemon, setPokemon] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPokedex, setFilteredPokedex] = useState<any>(null);

  const api = new MainClient({ logs: true });

  useEffect(() => {
    async function getPokedex() {
      try {
        const result = await api.pokemon.listPokemons(0, 9999);
        // Shuffle the array and take the first 20 items
        const shuffled = result.results.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const limitedResults = shuffled.slice(0, 20);
        setPokedex(result);
        setFilteredPokedex(limitedResults);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }

    getPokedex();
  }, []);

  useEffect(() => {
    if (pokedex) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const newFilteredPokedex = pokedex.results.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      console.log(newFilteredPokedex.results, lowerCaseSearchTerm);
      setFilteredPokedex(newFilteredPokedex);
    }
  }, [searchTerm, pokedex]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pokedex) {
    return <p>Couldn&apos;t Catch them All!</p>;
  }

  const handlePokemonClick = (name: string) => {
    setPokemon(name);
  };

  return (
    <div>
      <h2>Pokedex</h2>
      <div>
        <Input
          placeholder="Search pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {filteredPokedex?.results?.length === 0
          ? filteredPokedex.map((pokemon: any) => (
              <Button
                key={pokemon.name}
                onClick={() => handlePokemonClick(pokemon.name)}
              >
                <img
                  className="mx-1 size-5"
                  src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                  alt={pokemon.name}
                />
              </Button>
            ))
          : filteredPokedex.map((pokemon: any) => (
              <Button
                key={pokemon.name}
                onClick={() => handlePokemonClick(pokemon.name)}
              >
                <img
                  className="mx-1 size-5"
                  src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                  alt={pokemon.name}
                />
              </Button>
            ))}
      </div>
      {pokemon === null ? (
        <p>Pokemon Details</p>
      ) : (
        <Pokemon name={pokemon} api={api} /> // Pass props correctly
      )}
    </div>
  );
}
