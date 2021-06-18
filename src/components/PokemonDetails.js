import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

export default function PokemonDetails(pokemon) {
  //pokemon details link
  const pkmDetails = `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`;

  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

  useLayoutEffect(() => {
    const getDetails = (url) => {
      axios
        .get(url)
        .then((res) => {
          let data = res.data;
          setPokemonDetails(data);
          getSpecies(data.species.url)
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
    }

    getDetails(pkmDetails)
  }, [pkmDetails]);


  if (Object.values(pokemonEvolutions).length <= 0) { //Just to check if the object has data
      return (<h1>Loading...</h1>)
  }
  return (
    <>
      <section>
        <div className="container">
          <div className="relative inline-flex">
            <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
              <option>Select Game Version</option>
              {Object.keys(pokemonDetails.game_indices).map(key => (
                <option key={key}> {pokemonDetails.game_indices[key].version.name}</option>
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
                <h1>Pokedex Data</h1>
                <p>{pokemonDetails.id}</p>
                <p>{pokemonDetails.name}</p>
                {/* TODO: Have an utility function handle this to reduce repeated code */}
                {Object.keys(pokemonDetails.types).map(key => (
                <p key={key}> {pokemonDetails.types[key].type.name}</p>
                ))}
                {/* TODO: check if ability is hidden */}
                {Object.keys(pokemonDetails.abilities).map(key => (
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
                {Object.keys(pokemonSpecies.egg_groups).map(key => (
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
                {/* TODO: Function similar to types to look for which one is has a ev value */}
              </section>

              {/* Stats Data */}
              {/* HP */}
              {/* Atk */}
              {/* Def */}
              {/* speed */}
              {/* special attack */}
              {/* special defence */}
              <section className="outline-black">
                {Object.keys(pokemonDetails.stats).map(key => (
                <p key={key}> {pokemonDetails.stats[key].stat.name}: {pokemonDetails.stats[key].base_stat}</p>
                ))}
              </section>

              {/* Evolution Chain */}
              {/* Check if it has evolution then iterate through the nested object */}
              <section className="outline-black">
                <h1>Evolution Chain</h1>
              </section>

              {/* Flavor Text per generation */}
              <section className="outline-black">
                <h1>Flavor Text</h1>
              </section>

              {/* moves learnt */}
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

// ? Considering using displaying modal for specific data like move learnable by clicking on a button like moves learned via levelup
// ? Dropdown version selector to pull certain flavor texts and location information based on games
