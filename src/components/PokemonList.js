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
			alert("Oops... Can't find any more pokemon.");
		} else {
			getPokemon(paginationURL);
		}
	};

	useLayoutEffect(() => {
		getPokemon(pokeAPI);
	}, []);

	return (
    <>
      <div className="w-max-screen-xl mx-auto px-4 bg-gray-100">
        <div className="flex flex-wrap -mx-4 justify-evenly">
          <button
            className="text-black font-semibold bg-white py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 hover:bg-green-400"
            onClick={() => paginate(prev)}
          >
            Prev
          </button>
          <button
            className="text-black font-semibold bg-white py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 hover:bg-green-400"
            onClick={() => getPokemon(pokeAPI)}
          >
            Refetch
          </button>
          <button
            className="text-black font-semibold bg-white py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 hover:bg-green-400"
            onClick={() => paginate(next)}
          >
            Next
          </button>
        </div>
        <div className="flex flex-wrap -mx-4 justify-center">
          <ul className="grid grid-cols-4 px-10 gap-2">
            {pokemonList.map((pkm) => (
              <PokemonCard key={pkm.name} pokemon={pkm} />
            ))}
          </ul>
        </div>
        <br />
      </div>
    </>
  );
}

export default PokemonList;
