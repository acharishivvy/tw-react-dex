import React, { useState, useLayoutEffect, useEffect } from "react";
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
        //'Access-Control-Allow-Origin': '*',
        //'X-Method-Used': 'graphiql'
      },
      data: {
        query: `{
          pkm: pokemon_v2_pokemon(where: {name: {_eq: ${pokemon.pokemon.name}  }}) {
              id
              height
              weight
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
    <div className="bg-gradient-to-r from-pink-300 to-indigo-300"><h1 className="text-gray-700 text-xl font-bold">Loading</h1></div>
    
  ) : (
    <>
      <div className="bg-gradient-to-r from-pink-300 to-indigo-300">
        <div className="flex"></div>
        <div className="flex flex-row flex-wrap">
          {/* General Data */}
          {/* Name */}
          {/* ID */}
          {/* Types */}
          {/* Abilities */}
          {/* Height */}
          {/* Weight */}
          <div className="relative w-1/2 p-4 shadow-lg rounded-lg">
            <h1 className="block text-gray-700 text-lg font-bold mb-2">
              Pokedex Data
            </h1>
            <p>ID: {basicDetails.id}</p>
          </div>
        </div>
      </div>
    </>
  );
}
