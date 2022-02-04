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
            <>
              <div className="fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-gradient-to-r from-pink-300 to-indigo-300">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        {Capitalize(pokemon.pokemon.name)}
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="h-full w-full bg-gray-50">
                      <PokemonDetails pokemon={pokemon.pokemon} />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
