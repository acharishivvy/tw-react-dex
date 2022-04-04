import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { CalculateStatPercentage, Capitalize } from "../functions/utility";
import ProgressBar from "./progressBar";

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
            name
            height
            weight
            forms: pokemon_v2_pokemonforms {
              form_name
              name
              is_battle_only
              is_mega
              is_default
            }
            abilities: pokemon_v2_pokemonabilities {
              is_hidden
              ability: pokemon_v2_ability {
                name
              }
            }
            moves: pokemon_v2_pokemonmoves {
              move_learn_method_id
              level
              order
              version_group_id
              move: pokemon_v2_move {
                name
                accuracy
                power
                pp
              }
              learnMethod: pokemon_v2_movelearnmethod {
                name
              }
            }
            stats: pokemon_v2_pokemonstats {
              base_stat
              effort
              stat: pokemon_v2_stat {
                name
              }
            }
            types: pokemon_v2_pokemontypes {
              slot
              type: pokemon_v2_type {
                name
              }
            }
            species: pokemon_v2_pokemonspecy {
              base_happiness
              evolution_chain_id
              evolves_from_species_id
              hatch_counter
              is_baby
              is_mythical
              is_legendary
              order
              eggGroup: pokemon_v2_pokemonegggroups {
                group: pokemon_v2_egggroup {
                  name
                }
              }
              genus: pokemon_v2_pokemonspeciesnames {
                genus
              }
              flavorTexts: pokemon_v2_pokemonspeciesflavortexts {
                flavor_text
                gameVersion: pokemon_v2_version {
                  name
                }
              }
              pokedex: pokemon_v2_pokemondexnumbers {
                dexNo: pokemon_v2_pokedex {
                  name
                  id
                }
              }
              growth: pokemon_v2_growthrate {
                name
              }
              evolutionChain: pokemon_v2_evolutionchain {
                evoSpecies: pokemon_v2_pokemonspecies {
                  evolution: pokemon_v2_pokemonevolutions {
                    min_affection
                    min_beauty
                    min_happiness
                    min_level
                    needs_overworld_rain
                    time_of_day
                    turn_upside_down
                    heldItem: pokemonV2ItemByHeldItemId {
                      name
                    }
                    trigger: pokemon_v2_evolutiontrigger {
                      name
                    }
                    gender: pokemon_v2_gender {
                      name
                    }
                    item: pokemon_v2_item {
                      name
                    }
                    location: pokemon_v2_location {
                      name
                    }
                    move: pokemon_v2_move {
                      name
                    }
                    type: pokemon_v2_type {
                      name
                    }
                    evoName: pokemon_v2_pokemonspecy {
                      name
                    }
                  }
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
        {console.log(basicDetails)}
        <div className="flex flex-row flex-wrap">
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">#</h1>
            <p>{basicDetails.name}</p>
            <p>{basicDetails.species.pokedex[0].dexNo.name} Dex</p>
            <p>{basicDetails.species.pokedex[0].dexNo.id}</p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">A</h1>
            <p>{basicDetails.species.genus[8].genus}</p>
            {basicDetails.species.flavorTexts.map((el, idx) => (
              <React.Fragment key={idx}>
                {el.gameVersion.name === version && <p>{el.flavor_text}</p>}
              </React.Fragment>
            ))}
            <p>{basicDetails.height}</p>
            <p>{basicDetails.weight}</p>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">B</h1>
            {basicDetails.abilities.map((el) => (
              <React.Fragment key={el.ability.name}>
                <p>
                  {el.ability.name} {el.is_hidden === true && "- Hidden"}
                </p>
              </React.Fragment>
            ))}
            {basicDetails.types.map((el) => (
              <React.Fragment key={el.type.name}>
                <p>{el.type.name}</p>
              </React.Fragment>
            ))}
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">C</h1>
            {/* Probably need to run this outside of the render then display here saves duped code */}
            {basicDetails.stats.map((el) => (
              <React.Fragment key={el.stat.name}>
                <span>
                  {Capitalize(el.stat.name)} : {el.base_stat}
                </span>
                <ProgressBar
                  bgcolor="Lime"
                  progress={CalculateStatPercentage(el.base_stat)}
                  height={12}
                />
              </React.Fragment>
            ))}
            {basicDetails.stats.map((el) => (
              <React.Fragment key={el.stat.name}>
                <p>
                  {el.effort !== 0 &&
                    "EV Yield: " + el.effort + " " + Capitalize(el.stat.name)}
                </p>
              </React.Fragment>
            ))}
            {basicDetails.species.capture_rate}
            {basicDetails.species.growth.name}
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Breeding
            </h1>
          </div>
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Evolution Chain
            </h1>
            {basicDetails.species.evolutionChain.evoSpecies.map((el, idx) => (
              <React.Fragment>
                {el.evolution.length !== 0 &&
                  (el.evolution[0].trigger.name === "level-up" ? (
                    <>level-up</>
                  ) : el.evolution[0].trigger.name === "use-item" ? (
                    <>use-item</>
                  ) : (
                    <>Default</>
                  ))}
                {basicDetails.species.evolutionChain.evoSpecies.length <= 1 && (
                  <>This Pokemon Doesn't Evolve</>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Moves Learned - Tabbed Table
            </h1>
          </div> */}
        </div>
      </div>
    </>
  );
}
