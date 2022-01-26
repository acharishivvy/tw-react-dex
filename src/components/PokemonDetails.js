import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
//import Capitalize from "../functions/utility";

export default function PokemonDetails(pokemon) {
  const [basicDetails, setBasicDetails] = useState([]);

  //GraphQL Query
  const getPokemonDetails = async () => {
    const options = {
      method: "POST",
      url: "https://beta.pokeapi.co/graphql/v1beta",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: `{
          pkm: pokemon_v2_pokemon(where: {name: {_eq: ${pokemon.pokemon.name} }}) {
              id
              height
              weight
			  species: pokemon_v2_pokemonspecy {
				base_happiness
				capture_rate
				evolution_chain_id
				evolves_from_species_id
				forms_switchable
				gender_rate
				generation_id
				growth_rate_id
				has_gender_differences
				hatch_counter
				is_baby
				is_legendary
				is_mythical
				evo: pokemon_v2_evolutionchain {
				  evoItem: pokemon_v2_item {
					name
				  }
				}
				growth: pokemon_v2_growthrate {
				  name
				}
				dex: pokemon_v2_pokemondexnumbers {
				  pokedex_number
				  pokemon_v2_pokedex {
					name
				  }
				}
				egg: pokemon_v2_pokemonegggroups {
				  group: pokemon_v2_egggroup {
					name
				  }
				}
				flavor: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
				  flavor_text
				  f_version: pokemon_v2_version {
					name
				  }
				}
			  }
            } 
      }`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setBasicDetails(response.data.data.pkm[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    getPokemonDetails();
  }, []);

  return basicDetails.length === 0 ? (
    <div className="bg-gradient-to-r from-pink-300 to-indigo-300">
      <h1 className="text-gray-700 text-xl font-bold"> Loading </h1>
    </div>
  ) : (
    <>
      <div className="flex flex-col h-screen bg-gradient-to-r from-pink-300 to-indigo-300">
        <div className="flex"> </div>
        <div className="flex flex-row flex-wrap">
          {/* General Data */} {/* Name */} {/* ID */} {/* Types */}
          {/* Abilities */} {/* Height */} {/* Weight */}
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Pokedex Data
            </h1>
            <p> ID: {basicDetails.id} </p>
            <p> ID: {basicDetails.species.growth.name} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Pokedex Data
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Pokedex Data
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Pokedex Data
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
        </div>
      </div>
    </>
  );
}
