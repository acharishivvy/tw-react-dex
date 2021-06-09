import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  let pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=12";
  let [pokemonList, setPokemonList] = useState([]);
  let [next, setNext] = useState("");
  let [prev, setPrev] = useState("");

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
    console.log(pokemonList, next, prev);
  };

  useEffect(() => {
    getPokemon(pokeAPI);
  }, [pokeAPI]);

  return (
    <>
      <div className="App container p-6 mx-auto">
        <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">
          Simple AF Pokedex
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => getPokemon(pokeAPI)}
        >
          Refetch
        </button>
      </div>
      <PokemonCard />
    </>
  );
}

export default App;
