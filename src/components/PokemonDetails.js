import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import Capitalize from "../functions/utility";

export default function PokemonDetails(pokemon) {
  const [basicDetails, setBasicDetails] = useState([]);
  const [gameVersions, setGameVersions] = useState([]);
  let [version, setVersion] = useState("red");

  //GraphQL Query
  const getPokemonDetails = async () => {
    const options = {
      method: "POST",
      url: "https://beta.pokeapi.co/graphql/v1beta",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        query: `{
          gameVersion: pokemon_v2_version {
            id
            name
          }
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
				  dexType: pokemon_v2_pokedex {
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
				  fromVersion: pokemon_v2_version {
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
        setGameVersions(response.data.data.gameVersion);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setVersion(e.target.value);
  };

  useLayoutEffect(() => {
    getPokemonDetails();
  }, []);

  return basicDetails.length === 0 && gameVersions.length === 0 ? (
    <div className="bg-gradient-to-r from-pink-300 to-indigo-300">
      <h1 className="text-gray-700 text-xl font-bold"> Loading </h1>
    </div>
  ) : (
    <>
      <div className="flex flex-col bg-gradient-to-r from-pink-300 to-indigo-300">
        <div className="flex justify-center mb-3 xl:w-96">
          <select
            value={version}
            onChange={handleChange}
            className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          >
            {gameVersions.map((version, id) => (
              <option key={id} value={version.name}>
                {Capitalize(version.name)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row flex-wrap">
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Rect 1
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Rect 2 - Species Info, Flavour text, Height, Weight
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Abilites
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Base Stats - Bar Graph Training - EV Yield, Catch Rate, Growth
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Breeding - Gender Ratio
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Evolution Chain - Alternate Forms
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Moves Learned - Tabbed Table
            </h1>
            <p> ID: {basicDetails.id} </p>
          </div>
        </div>
      </div>
    </>
  );
}
