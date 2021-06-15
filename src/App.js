import PokemonList from "./components/PokemonList";

function App() {
  return (
    <>
    <header className="bg-gray-800">
      
      <section className="flex items-center justify-center" style={{height: 500}}>
        <div className="text-center">
          <h1 className="text-xl font-medium tracking-wider text-gray-300"> Made with ReactJS, TailwindCSS and PokeAPI</h1>
          <h2 className="mt-6 text-3xl font-bold text-white md:text-5xl">React Pokedex</h2>
        </div>
      </section>
    </header>
    {/* Main Content */}
    <div className="flex-none sm:flex-1 bg-gray-300">
      <PokemonList />
    </div>
    </>
  );
}

export default App;
