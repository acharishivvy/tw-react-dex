import React, { useState } from "react";
import PokemonDetails from "./PokemonDetails";
import Capitalize from "../functions/utility";

function PokemonCard(pokemon) {
  let [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card goes here */}
      <div className="container mx-auto p-9 bg-grey max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
        {/* Card Image */}
        <img
          className="w-full rounded-xl"
          src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.pokemon.name}.png`}
          alt={pokemon.pokemon.name}
        />
        {/* Card Content */}
        <div className="grid items-center text-center">
          <div className="text-black mt-5 text-2xl font-semibold capitalize">
            {pokemon.pokemon.name}
          </div>
          <br />
          <button
            className="text-black font-semibold bg-white py-1 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 hover:bg-green-400"
            onClick={() => setShowModal(true)}
            type="button"
          >
            Details
          </button>
          {showModal ? (
            <React.Fragment>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font-semibold leading-snug">
                        {Capitalize(pokemon.pokemon.name)}
                      </h3>
                    </div>
                    <div className="relative flex-auto">
                      <div
                        className="overflow-y-auto"
                        style={{ height: "680px" }}
                      >
                        <PokemonDetails pokemon={pokemon.pokemon} />
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default PokemonCard;

