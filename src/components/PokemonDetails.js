import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { CalculateStatPercentage } from "../functions/utility";
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
                language: pokemon_v2_language {
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
    <div className="">
      <h1 className=""> Loading </h1>
    </div>
  ) : (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex justify-center mb-3">
          Game Version:
          <select
            value={version}
            onChange={handleChange}
            className="bg-magnolia border border-gray-300 rounded-full text-center hover:border-gray-400 focus:outline-none appearance-none"
          >
            {gameVersions.map((version, id) => (
              <option key={id} value={version.name} className="capitalize">
                {version.name}
              </option>
            ))}
          </select>
        </div>
        {console.log(basicDetails)}
        <div className="flex flex-row flex-wrap justify-items-center">
          <div className="shadow-lg rounded-lg w-1/3 flex-grow">
            <h1 className="">Boi</h1>
            <p className="capitalize">
              {basicDetails.species.pokedex[0].dexNo.name} Dex
            </p>
            <p className="capitalize">
              {basicDetails.species.pokedex[0].dexNo.id}
            </p>
          </div>
          <div className="shadow-lg rounded-lg w-1/3 flex-grow">
            <h1 className="">B</h1>
            {basicDetails.abilities.map((el) => (
              <React.Fragment key={el.ability.name}>
                <p>
                  {el.ability.name} {el.is_hidden === true && "- Hidden"}
                </p>
              </React.Fragment>
            ))}
            {basicDetails.types.map((el) => (
              <React.Fragment key={el.type.name}>
                <button
                  className={`bg-${el.type.name} shadow-lg rounded-lg px-4 mx-2 capitalize`}
                >
                  {el.type.name}
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="shadow-lg rounded-lg w-1/3 flex-grow">
            <h1>Breeding</h1>
          </div>
          <div className="shadow-lg rounded-lg w-full">
            <h1 className="">A</h1>
            <p>{basicDetails.species.genus[8].genus}</p>
            {basicDetails.species.flavorTexts.map((el, idx) => (
              <React.Fragment key={idx}>
                {el.gameVersion.name === version &&
                  el.language.name === "en" && <p>{el.flavor_text}</p>}
              </React.Fragment>
            ))}
            <p>{basicDetails.height}</p>
            <p>{basicDetails.weight}</p>
          </div>
          <div className="shadow-lg rounded-lg w-1/2">
            <h1 className="">C</h1>
            {/* Probably need to run this outside of the render then display here saves duped code */}
            {basicDetails.stats.map((el) => (
              <React.Fragment key={el.stat.name}>
                <span className="capitalize">
                  {el.stat.name} : {el.base_stat}
                </span>
                <ProgressBar
                  className="p-4"
                  bgcolor="Lime"
                  progress={CalculateStatPercentage(el.base_stat)}
                  height={12}
                />
              </React.Fragment>
            ))}
            {basicDetails.stats.map((el) => (
              <React.Fragment key={el.stat.name}>
                <p className="capitalize">
                  {el.effort !== 0 &&
                    "EV Yield: " + el.effort + " " + el.stat.name}
                </p>
              </React.Fragment>
            ))}
            {basicDetails.species.capture_rate}
            {basicDetails.species.growth.name}
          </div>
          <div className="shadow-lg rounded-lg w-1/2 overflow-y-auto">
            <h1 className="">Evolution Chain</h1>
            {basicDetails.species.evolutionChain.evoSpecies.map((el, idx) => (
              <React.Fragment>
                {el.evolution.length !== 0 &&
                  el.evolution.map((ev) => {
                    if (ev.trigger.name === "level-up") {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} at Level {ev.min_level}{" "}
                          <br />
                        </React.Fragment>
                      );
                    } else if (ev.trigger.name === "use-item") {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} using {ev.item.name}{" "}
                          <br />
                        </React.Fragment>
                      );
                    } else if (ev.trigger.name === "trade") {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} via Trade <br />
                        </React.Fragment>
                      );
                    } else if (
                      ev.trigger.name === "trade" &&
                      ev.heldItem !== null
                    ) {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} via Trade holding{" "}
                          {ev.heldItem.name}
                          <br />
                        </React.Fragment>
                      );
                    } else if (
                      ev.trigger.name === "level-up" &&
                      ev.min_happiness !== null
                    ) {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} upon Level up with{" "}
                          {ev.min_happiness} Happiness
                          <br />
                        </React.Fragment>
                      );
                    } else if (
                      ev.trigger.name === "level-up" &&
                      ev.type !== null
                    ) {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} while know a{" "}
                          {ev.type.name} type move
                          <br />
                        </React.Fragment>
                      );
                    } else if (
                      ev.trigger.name === "level-up" &&
                      ev.move !== null
                    ) {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} upon Level up with{" "}
                          {ev.move.name} learnt
                          <br />
                        </React.Fragment>
                      );
                    } else if (
                      ev.trigger.name === "level-up" &&
                      ev.location !== null
                    ) {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} upon Level up at{" "}
                          {ev.location.name}
                          <br />
                        </React.Fragment>
                      );
                    } else if (
                      ev.trigger.name === "level-up" &&
                      ev.min_happiness !== null &&
                      ev.type !== null
                    ) {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} upon Level up with{" "}
                          {ev.min_happiness} Happiness and knowing a{" "}
                          {ev.type.name} move.
                          <br />
                        </React.Fragment>
                      );
                    } else if (
                      ev.trigger.name === "level-up" &&
                      ev.min_happiness !== null &&
                      ev.time_of_day !== null
                    ) {
                      return (
                        <React.Fragment>
                          Evolves to {ev.evoName.name} upon Level up with{" "}
                          {ev.min_happiness} Happiness during the{" "}
                          {ev.time_of_day}
                          . <br />
                        </React.Fragment>
                      );
                    } else {
                      return <React.Fragment>Default</React.Fragment>;
                    }
                  })}
                {basicDetails.species.evolutionChain.evoSpecies.length <= 1 && (
                  <React.Fragment>This Pokemon Doesn't Evolve</React.Fragment>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* <div className="">
            <h1 className="">
              Moves Learned - Tabbed Table
            </h1>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}
