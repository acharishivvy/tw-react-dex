import React, { useState } from "react";
import { PokemonClient } from "pokenode-ts";

export default function Pokedex() {
  const [pokedex, SetPokedex] = useState<any[]>([]);

  (async () => {
    const api = new PokemonClient();

    await api.listPokemons(0, 2000).then((data) => SetPokedex(data.results));
  })();
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {pokedex.map((pokemon) => (
          <li key={pokemon.url}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}
