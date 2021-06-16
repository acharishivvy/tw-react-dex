import React, {useState, useLayoutEffect} from 'react'
import axios from 'axios'

export default function PokemonDetails(pokemon) {
    //pokemon details link
    const pkmDetails = `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`

    const [pokemonSpecies, setPokemonSpecies] = useState([])
    const [pokemonDetails, setPokemonDetails] = useState([])

    const getDetails = (url) => {
        axios
      .get(url)
      .then((res) => {
        let data = res.data;
        setPokemonDetails(data)
        getSpecies(data.species.url)
      })
      .catch((error) => console.error(error));
    }

    const getSpecies = (url) => {
        axios
      .get(url)
      .then((res) => {
        let data = res.data;
        console.log(data)
        setPokemonSpecies(data);
      })
      .catch((error) => console.error(error));
    }

    useLayoutEffect(() => {
        getDetails(pkmDetails)
    }, [])

    return (
        <>
            <section>
                <div className="container">
                    <div className="mx-auto flex flex-wrap">
                        <img src="" alt=""/>
                        <div className="">
                            <h1>{pokemonDetails.id}</h1>
                            <h2>{pokemonSpecies.capture_rate}</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
