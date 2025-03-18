import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import {
  CalculateStatPercentage,
  ConvertUnits,
} from "../functions/utility.jsx";
import ProgressBar from "./progressBar.js";

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
              level
              move: pokemon_v2_move {
                name
                accuracy
                power
              }
              learnMethod: pokemon_v2_movelearnmethod {
                name
              }
              gameVersion: pokemon_v2_versiongroup {
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
      {/* To force tailwind to make the colours available  */}
      <span
        className="bg-normal bg-fire bg-water
        bg-electric
        bg-grass
        bg-ice
        bg-fighting
        bg-poison
        bg-ground
        bg-flying
        bg-psychic
        bg-bug
        bg-rock
        bg-ghost
        bg-dragon
        bg-dark
        bg-steel
        bg-fairy"
      ></span>
    </div>
  ) : (
    <React.Fragment>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-center mb-3">
          Game Version:
          <select
            value={version}
            onChange={handleChange}
            className="bg-magnolia border border-gray-300 rounded-full text-center hover:border-gray-400 focus:outline-none appearance-none capitalize"
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
            <p className="capitalize">
              {basicDetails.species.pokedex[0].dexNo.name} Dex No. #
              {basicDetails.id}
            </p>
            <p>Species: {basicDetails.species.genus[8].genus}</p>
            <p>Height: {ConvertUnits(basicDetails.height)}m</p>
            <p>Weight: {ConvertUnits(basicDetails.weight)}kg</p>
          </div>
          <div className="shadow-lg rounded-lg w-1/3 flex-grow">
            {basicDetails.types.map((el) => (
              <React.Fragment key={el.type.name}>
                {/* Doing it this way is not recommended or supported */}
                <button
                  className={`bg-${el.type.name} shadow-lg rounded-lg px-4 mx-2 capitalize`}
                >
                  {el.type.name}
                </button>
              </React.Fragment>
            ))}
            {basicDetails.abilities.map((el) => (
              <React.Fragment key={el.ability.name}>
                <p className="capitalize">
                  {el.ability.name} {el.is_hidden === true && <sub>Hidden</sub>}
                </p>
              </React.Fragment>
            ))}
          </div>
          <div className="shadow-lg rounded-lg w-1/3 flex-grow">
            <span className="capitalize">
              {" "}
              Egg Groups:{" "}
              {basicDetails.species.eggGroup.map((el, idx) => (
                <React.Fragment>
                  <em className="capitalize">{el.group.name} </em>
                </React.Fragment>
              ))}
            </span>
          </div>
          <div className="shadow-lg rounded-lg w-full">
            {basicDetails.species.flavorTexts.map((el, idx) => (
              <React.Fragment key={idx}>
                {el.gameVersion.name === version &&
                el.language.name === "en" ? (
                  <p>{el.flavor_text}</p>
                ) : (
                  <></>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="shadow-lg rounded-lg w-1/2">
            <h1 className="">Base Stats</h1>
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
            <p className="capitalize">
              Growth Rate: {basicDetails.species.growth.name}
            </p>
          </div>
          <div className="shadow-lg rounded-lg w-1/2 overflow-y-auto">
            <h1 className=" text-xl font-bold">Evolutions</h1>
            {basicDetails.species.evolutionChain.evoSpecies.map((el, idx) => (
              <React.Fragment>
                {el.evolution.length !== 0 &&
                  el.evolution.map((ev) => {
                    if (ev.trigger.name === "level-up") {
                      if (ev.min_happiness !== null) {
                        if (ev.type !== null) {
                          return (
                            <React.Fragment>
                              Evolves to{" "}
                              <strong className="capitalize">
                                {ev.evoName.name}
                              </strong>{" "}
                              upon Level up with {ev.min_happiness} Happiness
                              and knowing a{" "}
                              <strong className="capitalize">
                                {ev.type.name}
                              </strong>{" "}
                              move.
                              <br />
                            </React.Fragment>
                          );
                        } else if (ev.time_of_day !== "") {
                          return (
                            <React.Fragment>
                              Evolves to{" "}
                              <strong className="capitalize">
                                {ev.evoName.name}
                              </strong>{" "}
                              upon Level up with {ev.min_happiness} Happiness
                              during the {ev.time_of_day}
                              . <br />
                            </React.Fragment>
                          );
                        } else {
                          return (
                            <React.Fragment>
                              Evolves to{" "}
                              <strong className="capitalize">
                                {ev.evoName.name}
                              </strong>{" "}
                              upon Level up with {ev.min_happiness} Happiness
                              <br />
                            </React.Fragment>
                          );
                        }
                      } else if (ev.location !== null) {
                        return (
                          <React.Fragment>
                            Evolves to{" "}
                            <strong className="capitalize">
                              {ev.evoName.name}
                            </strong>{" "}
                            upon Level up at{" "}
                            <strong className="capitalize">
                              {ev.location.name}
                            </strong>
                            <br />
                          </React.Fragment>
                        );
                      } else if (ev.move !== null) {
                        return (
                          <React.Fragment>
                            Evolves to{" "}
                            <strong className="capitalize">
                              {ev.evoName.name}
                            </strong>{" "}
                            upon Level up with{" "}
                            <strong className="capitalize"></strong>
                            {ev.move.name} learnt
                            <br />
                          </React.Fragment>
                        );
                      } else if (ev.type !== null) {
                        return (
                          <React.Fragment>
                            Evolves to{" "}
                            <strong className="capitalize">
                              {ev.evoName.name}
                            </strong>{" "}
                            while know a{" "}
                            <strong className="capitalize">
                              {ev.type.name}
                            </strong>{" "}
                            type move
                            <br />
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment>
                            Evolves to{" "}
                            <strong className="capitalize">
                              <strong className="capitalize">
                                {ev.evoName.name}
                              </strong>
                            </strong>{" "}
                            at Level {ev.min_level} <br />
                          </React.Fragment>
                        );
                      }
                    } else if (ev.trigger.name === "use-item") {
                      return (
                        <React.Fragment>
                          Evolves to{" "}
                          <strong className="capitalize">
                            {ev.evoName.name}
                          </strong>{" "}
                          using{" "}
                          <strong className="capitalize">{ev.item.name}</strong>
                          <br />
                        </React.Fragment>
                      );
                    } else if (ev.trigger.name === "trade") {
                      if (ev.heldItem !== null) {
                        return (
                          <React.Fragment>
                            Evolves to{" "}
                            <strong className="capitalize">
                              {ev.evoName.name}
                            </strong>{" "}
                            via Trade holding{" "}
                            <strong className="capitalize">
                              {ev.heldItem.name}
                            </strong>
                            <br />
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment>
                            Evolves to{" "}
                            <strong className="capitalize">
                              {ev.evoName.name}
                            </strong>{" "}
                            via Trade <br />
                          </React.Fragment>
                        );
                      }
                    } else if (ev.trigger.name === "three-critical-hits") {
                      return (
                        <React.Fragment>
                          Evolves to{" "}
                          <strong className="capitalize">
                            {ev.evoName.name}
                          </strong>{" "}
                          after landing 3 Critical hits in one battle.
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
          <div className="shadow-lg rounded-lg w-full overflow-y-auto">
            <h1 className="text-xl font-extrabold">Moves</h1>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-jet text-magnolia">
                  <th className="w-1/5 font-bold">Level</th>
                  <th className="w-1/5 font-bold">Move Name</th>
                  <th className="w-1/5 font-bold">Power</th>
                  <th className="w-1/5 font-bold">Accuracy</th>
                  <th className="w-1/5 font-bold">Learn Method</th>
                </tr>
              </thead>
              <tbody>
                {basicDetails.moves.map((el, idx) =>
                  el.gameVersion.name.includes(version) ? (
                    <tr
                      key={idx}
                      className="hover:bg-illumination-emerald hover:text-magnolia "
                    >
                      <td>{el.level}</td>
                      <td className="capitalize">{el.move.name}</td>
                      <td>{el.move.power}</td>
                      <td>{el.move.accuracy}</td>
                      <td className="capitalize">{el.learnMethod.name}</td>
                    </tr>
                  ) : (
                    <></>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
