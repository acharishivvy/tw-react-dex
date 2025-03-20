import { MainClient } from "pokenode-ts";
import { useState } from "react";

export default function Pokemon(pokemon: any, api: MainClient) {
  const [species, SetSpecies] = useState<any>(null);

  //SetSpecies(api.pokemon.getPokemonSpeciesByName(pokemon.name));

  console.log(species.name);
  return (
    <div>
      <h1>PokemonTSX</h1>
      <h1>{pokemon.name}</h1>
      <p>ID: {pokemon.id}</p>
      <p>
        Types: {pokemon.types.map((type: any) => type.type.name).join(", ")}
      </p>
      <p>Height: {pokemon.height} decimeters</p>
      <p>Weight: {pokemon.weight} hectograms</p>
    </div>
  );
}
