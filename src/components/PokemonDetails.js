import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

export default function PokemonDetails(pokemon) {
  const pkmDetails = `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`;

  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
  let evoChain = [];

  //Trying to handle as many conditionals as possible
  const traverseEvoChain = (loc) => {
    if (loc.hasOwnProperty('evolves_to')){
      let numberOfEvolutions = loc.evolves_to.length;
      for (let i = 0; i < numberOfEvolutions; i++) {
        if (numberOfEvolutions === undefined){
          evoChain.push({
            "trigger_name": "no-evolution"
          })
          console.log(evoChain)
        }
        // Only ever looks at the first evolution details so pokemon like with multiples ways to evolve (including multiple locations or methods aren't accounted for)
        evoChain.push({
          "species_name": loc.evolves_to[i].species.name,
          "trigger_name": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].trigger.name,
          "min_level": !loc.evolves_to[i] ? 1 : loc.evolves_to[i].evolution_details[0].min_level,
          "item": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].item,
          "trade_item": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].held_item,
          "happiness": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].min_happiness,
          "time_of_day": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].time_of_day,
          "known_move_type": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].known_move_type,
          "party_species": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].party_species,
          "party_type": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].party_type,
          "gender": !loc.evolves_to[i] ? null : loc.evolves_to[i].evolution_details[0].gender
        });
        if (loc.evolves_to[i].hasOwnProperty('evolves_to')){
        traverseEvoChain(loc.evolves_to[i])
        }
      } 
    }
  }

  const processEvolutions = (chainData) => {
    traverseEvoChain(chainData)
  };

  useLayoutEffect(() => {
    const getDetails = (url) => {
      axios
        .get(url)
        .then((res) => {
          let data = res.data;
          setPokemonDetails(data);
          getSpecies(data.species.url);
        })
        .catch((error) => console.error(error));
    };

    const getSpecies = (url) => {
      axios
        .get(url)
        .then((res) => {
          let data = res.data;
          setPokemonSpecies(data);
          getEvolutions(data.evolution_chain.url);
        })
        .catch((error) => console.error(error));
    };

    const getEvolutions = (url) => {
      axios
        .get(url)
        .then((res) => {
          let data = res.data;
          setPokemonEvolutions(data);
        })
        .catch((error) => console.error(error));
    };

    getDetails(pkmDetails);
  }, [pkmDetails]);

  if (Object.values(pokemonEvolutions).length <= 0) {
    //Just to check if the object has data
    return <h1>Loading...</h1>;
  } else {
    processEvolutions(pokemonEvolutions.chain);
  } 

  return (
    <>
      <section>
        <div className="container">
          <div className="relative p-8 bg-white w-6xl h-1/2 max-w-md m-auto flex-col flex">
            <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
              <option>Select Game Version</option>
              {Object.keys(pokemonDetails.game_indices).map((key) => (
                <option key={key}>
                  {" "}
                  {pokemonDetails.game_indices[key].version.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-auto flex flex-wrap">
            <img src="" alt="" />
            <div className="">
              {/* General Data */}
              {/* Name */}
              {/* ID */}
              {/* Types */}
              {/* Abilities */}
              {/* Height */}
              {/* Weight */}
              <section className="outline-black">
                <h1>Pokemon Data</h1>
                <p>{pokemonDetails.id}</p>
                <p>{pokemonDetails.name}</p>
                {/* TODO: Have an utility function handle this to reduce repeated code */}
                {Object.keys(pokemonDetails.types).map((key) => (
                  <p key={key}> {pokemonDetails.types[key].type.name}</p>
                ))}
                {/* TODO: check if ability is hidden */}
                {Object.keys(pokemonDetails.abilities).map((key) => (
                  <p key={key}> {pokemonDetails.abilities[key].ability.name}</p>
                ))}
                {/* Convert to conventional measurements */}
                <p>{pokemonDetails.height}</p>
                <p>{pokemonDetails.weight}</p>
              </section>

              {/* Breeding Data */}
              {/* Egg Groups */}
              {/* Hatch Time/Steps */}
              {/* Growth Speed */}
              {/* Gender Ratio*/}
              <section className="outline-black">
                <h1>Breeding Data</h1>
                {Object.keys(pokemonSpecies.egg_groups).map((key) => (
                  <p key={key}> {pokemonSpecies.egg_groups[key].name}</p>
                ))}
                <p>{pokemonSpecies.hatch_counter}</p>
                <p>{pokemonSpecies.growth_rate.name}</p>
                <p>{pokemonSpecies.gender_ratio}</p>
              </section>

              {/* Training Data */}
              {/* Base exp */}
              {/* base friendship */}
              {/* Capture Rate */}
              {/* EV Stat */}
              <section className="outline-black">
                <h1> Training Data </h1>
                <p>{pokemonDetails.base_experience}</p>
                <p>{pokemonSpecies.base_friendship}</p>
                <p>{pokemonSpecies.capture_rate}</p>
                {Object.keys(pokemonDetails.stats).map((key) => {
                  if (pokemonDetails.stats[key].effort !== 0) {
                    return (
                      <p key={key}>
                        {" "}
                        {pokemonDetails.stats[key].stat.name}:{" "}
                        {pokemonDetails.stats[key].effort}
                      </p>
                    );
                  } else {
                    return null;
                  }
                })}
              </section>

              {/* Stats Data */}
              {/* HP */}
              {/* Atk */}
              {/* Def */}
              {/* speed */}
              {/* special attack */}
              {/* special defence */}
              <section className="outline-black">
                <h1>Stats</h1>
                {Object.keys(pokemonDetails.stats).map((key) => (
                  <p key={key}>
                    {" "}
                    {pokemonDetails.stats[key].stat.name}:{" "}
                    {pokemonDetails.stats[key].base_stat}
                  </p>
                ))}
              </section>

              {/* Evolution Chain */}
              <section className="outline-black">
                <h1>Evolution Chain</h1>
                <p>{evoChain.map((evo) =>
                  { 
                    switch (evo.trigger_name){
                      case "level-up":
                        return <> 
                          <li>{evo.species_name} via {evo.trigger_name}</li> 
                            <li>{!evo.min_level ? null : `at ${evo.min_level}`}</li>
                            <li>{!evo.happiness ? null : " with High Friendship"}</li>
                            <li>{!evo.time_of_day ? null : `during the ${evo.time_of_day}`}</li>
                            <li>{!evo.gender ? null : (evo.gender ? 1 : "female" )}</li>
                            <li>{!evo.gender ? null : (evo.gender ? 2 : "male" )}</li>
                        </> 
                      case "trade":
                        return <li>{evo.species_name} {evo.trigger_name} {evo.held_item.name}</li>
                      case "use-item":
                        return <li>{evo.species_name} {evo.trigger_name} {evo.item.name}</li>
                      case "shed" : 
                        return <li>This pokemon evolves via {evo.trigger_name}</li>
                      case "other":
                        return <li>This pokemon evolves via {evo.trigger_name}</li>
                      case "no-evolution":
                        return <li>This pokemon doesn't evolve!</li>
                      default:
                        return null
                    } 
                  } 
                )}</p>
              </section>

              {/* Flavor Text per generation */}
              <section className="outline-black">
                <h1>Flavor Text</h1>
              </section>

              {/* moves learnt; tutor, egg, level-up, machine */}
              <section className="outline-black">
                <h1>Moves</h1>
              </section>

              {/* Sprites */}
              <section className="outline-black">
                <h1>Sprites</h1>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
