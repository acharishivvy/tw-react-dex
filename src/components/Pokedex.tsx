import { useEffect, useState } from "react";
import { MainClient } from "pokenode-ts";
import { Button } from "./ui/button";
import Pokemon from "./Pokemon";

export default function Pokedex() {
  const [pokedex, setPokedex] = useState<any>(null);
  const [pokemon, setPokemon] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const api = new MainClient({ logs: true });

  useEffect(() => {
    async function getPokedex() {
      try {
        const result = await api.pokemon.listPokemons();
        setPokedex(result);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }

    getPokedex();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pokedex) {
    return <p>Couldn't Catch them All!</p>;
  }

  const handlePokemonClick = (name: string) => {
    setPokemon(name);
  };

  return (
    <div>
      <h2>Pokedex</h2>
      <div>
        {pokedex.results.map((pokemon: any) => (
          <Button
            key={pokemon.name}
            onClick={() => handlePokemonClick(pokemon.name)}
          >
            {pokemon.name}
          </Button>
        ))}
      </div>
      {pokemon === null ? (
        <p>Please Select a Pokemon</p>
      ) : (
        <Pokemon name={pokemon} api={api} /> // Pass props correctly
      )}
    </div>
  );
}
