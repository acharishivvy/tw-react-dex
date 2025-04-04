import { MainClient } from "pokenode-ts";
import { useEffect, useState } from "react";

interface PokemonProps {
  name: string;
  api: MainClient;
}

const Pokemon = ({ name, api }: PokemonProps) => {
  const [species, setSpecies] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      setLoading(true);
      setError(null);
      try {
        const speciesData = await api.pokemon.getPokemonSpeciesByName(name);
        setSpecies(speciesData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [name, api]);

  if (loading) {
    return <p>Loading species information...</p>;
  }

  if (error) {
    return <p>Error fetching species: {error}</p>;
  }

  if (!species) {
    return <p>No species data available.</p>;
  }

  return (
    <div>
      <h2>{name} Species Details</h2>
      <div>
        <p>
          <strong>Name:</strong> {species.name}
        </p>
        {species.habitat && (
          <p>
            <strong>Habitat:</strong> {species.habitat.name}
          </p>
        )}
      </div>
    </div>
  );
};
export default Pokemon;
