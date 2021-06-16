import React, { useState } from "react";
import PokemonDetails from "./PokemonDetails";

function PokemonCard(pokemon) {
  let [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card goes here */}
      <div className="max-w-sm w-auto rounded shadow-lg bg-white">
        {/* Card Image */}
        <img
          className="w-auto"
          src={`https://img.pokemondb.net/artwork/large/${pokemon.pokemon.name}.jpg`}
          alt={pokemon.pokemon.name}
        />
        {/* Card Content */}
        <div className="px-6 py-4 bg-red-500 place-self-end">
          <div className="font-bold text-xl mb-2 uppercase">
            {pokemon.pokemon.name}
          </div>
          <div className="text-gray-700 text-base"></div>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setShowModal(true)}
              type="button"
            >
              Details
            </button>
            {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold uppercase">
                    {pokemon.pokemon.name}
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
                <div className="relative p-6 flex-auto">
                  <PokemonDetails pokemon={pokemon.pokemon}/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
