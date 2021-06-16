import React from 'react'

export default function PokemonDetails(pokemon) {
    //pokemon details link
    const pkmDetails = `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`
    const pkmSpecies = `https://pokeapi.co/api/v2/pokemon-species/1/${pokemon.pokemon.name}`

    return (
        <div>
            <h1>{pokemon.pokemon.name}</h1>
            <h2>{pkmDetails} {pkmSpecies}</h2>
        </div>
    )
}
