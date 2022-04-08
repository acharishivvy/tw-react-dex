import PokemonList from "./components/PokemonList";
import React from "react";

function App() {
  return (
    <>
      <header className="bg-languid-lavender">
        <section className="flex py-24 justify-center">
          <div className="p-12 text-center max-w-2xl">
            <h1 className="md:text-3xl text-3xl font-bold"> React-Dex</h1>
            <h2 className="text-xl font-normal mt-4">
              Simple Pokedex made using ReactJS and TailwindCSS
            </h2>
            <h3>This uses PokeAPI so it's prone to getting Rate-Limited!</h3>
          </div>
        </section>
      </header>
      <div>
        <PokemonList />
      </div>
    </>
  );
}

export default App;
