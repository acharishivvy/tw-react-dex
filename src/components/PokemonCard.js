import React from "react";

function PokemonCard(pokemon) {
  return (
    <>
      {/* Card goes here */}
      <div className="max-w-sm w-auto rounded overflow-hidden shadow-lg bg-white">
        {/* Card Image */}
        <img className="w-auto" src={`https://img.pokemondb.net/artwork/large/${pokemon.pokemon.name}.jpg`} alt={pokemon.pokemon.name} />
        {/* Card Content */}
        <div className="px-6 py-4">
          <div class="font-bold text-xl mb-2 uppercase">{pokemon.pokemon.name}</div>
          <p class="text-gray-700 text-base">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
              Details
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
