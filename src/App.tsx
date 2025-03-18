import Pokedex from "./components/Pokedex";
import "./App.css";
//import PokemonList from "./components/PokemonList";

function App() {
  return (
    <>
      <header className="bg-languid-lavender">
        <section className="flex py-24 justify-center">
          <div className="p-12 text-center max-w-2xl text-jet">
            <h1 className="md:text-3xl text-3xl font-bold"> React-Dex</h1>
            <h2 className="text-xl font-normal mt-4 ">
              Simple Pokedex made using ReactJS and TailwindCSS
            </h2>
            <h3>now powered by VITE!</h3>
          </div>
        </section>
        <section className="bg-languid-lavender">
          <div>
            <button className="text-black font-semibold bg-magnolia py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 hover:bg-illumination-emerald hover:text-white">
              Pokedex
            </button>
            <button className="text-black font-semibold bg-magnolia py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 hover:bg-illumination-emerald hover:text-white">
              Team Bulder
            </button>
            <button className="text-black font-semibold bg-magnolia py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 hover:bg-illumination-emerald hover:text-white">
              Simulation
            </button>
          </div>
        </section>
      </header>
      <div>
        <Pokedex />
      </div>

      {/* <div>
        <PokemonList />
      </div> */}
    </>
  );
}

export default App;
