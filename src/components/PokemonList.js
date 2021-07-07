import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=16";
  let [pokemonList, setPokemonList] = useState([]);
  let [next, setNext] = useState(null);
  let [prev, setPrev] = useState(null);

  const getPokemon = (url) => {
    axios
      .get(url)
      .then((res) => {
        let data = res.data;
        setPokemonList(data.results);
        if (data.next != null) {
          setNext(data.next);
        }
        if (data.previous != null) {
          setPrev(data.previous);
        }
      })
      .catch((error) => console.error(error));
  };

  const paginate = (paginationURL) => {
    if (paginationURL === null) {
      alert("No More Pokemon Available");
    } else {
      getPokemon(paginationURL);
    }
  };

  useLayoutEffect(() => {
    getPokemon(pokeAPI);
  }, []);

  return (
    <>
      <div className="container my-12 mx-auto ">
        <div className="flex flex-wrap flex-none w-full">
          <ul className="">
            {pokemonList.map((pkm) => (
              <PokemonCard key={pkm.name} pokemon={pkm} />
            ))}
          </ul>
        </div>
        <div className="">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => paginate(prev)}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => paginate(next)}
          >
            Next
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => getPokemon(pokeAPI)}
          >
            Refetch
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
