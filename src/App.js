import { useState, useLayoutEffect } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  let pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=12";
  let [pokemonList, setPokemonList] = useState([]);
  let [next, setNext] = useState(null);
  let [prev, setPrev] = useState(null);

  // ! Probably the most important function, needs to be more robust
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

  // ? Update Name here, simple pagination
  const paginate = (napi) => {
    if (napi === null){
      alert("No More Pokemon Available")
    } else {
      console.log(napi)
      getPokemon(napi)
    }
  }

  // const searchPokemon = (query) => {

  // }

  useLayoutEffect(() => {
    getPokemon(pokeAPI);
  }, []);

  return (
    <>
      <div class="w-full h-screen bg-center bg-no-repeat bg-cover">
        <div class="w-full h-screen bg-opacity-50 bg-black flex justify-center items-center">
          <div class="mx-4 text-center text-white">
            <h1 class="font-bold text-6xl mb-4">React Pokedex</h1>
            <h2 class="font-bold text-3xl mb-12">don't expect too much</h2>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => getPokemon(pokeAPI)}
              >
                Refetch
              </button>

              <ul>
                {pokemonList.map((pkm) => (
                  <li key={pkm.id}>{pkm.name}</li>
                ))}
              </ul>

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
            </div>
          </div>
        </div>
      </div>

      <PokemonCard />
    </>
  );
}

export default App;
