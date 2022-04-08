import React, { useState } from "react";
import PokemonDetails from "./PokemonDetails";

function PokemonCard(pokemon) {
  let [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card goes here */}
      <div className="bg-magnolia container mx-auto p-9 bg-grey max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 hover:shadow-jet">
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
            className=" text-jet font-semibold py-1 px-2 rounded-lg hover:shadow-lg transition duration-500 transform-gpu hover:scale-105 hover:bg-illumination-emerald hover:text-white"
            onClick={() => setShowModal(true)}
            type="button"
          >
            Details
          </button>
          {showModal ? (
            <React.Fragment>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-magnolia">
                    <div className="flex items-start justify-between p-5 ">
                      <h3 className="text-3xl font-semibold leading-snug">
                        {pokemon.pokemon.name}
                      </h3>
                    </div>
                    <div className="relative flex-auto p-6">
                      <div
                        className="overflow-y-auto"
                        style={{ height: "680px" }}
                      >
                        <PokemonDetails pokemon={pokemon.pokemon} />
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 rounded-b">
                      <button
                        className="text-jet font-bold uppercase px-6 py-2 rounded-lg hover:shadow-lg transition duration-500 transform-gpu hover:scale-105 hover:bg-illumination-emerald hover:text-white"
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

