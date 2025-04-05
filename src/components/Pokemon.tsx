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
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  useEffect(() => {
    const fetchSpecies = async () => {
      setLoading(true);
      setError(null);
      try {
        const speciesData = await api.pokemon.getPokemonSpeciesByName(name);
        setSpecies(speciesData);
        // Set the default selected version to the first available English flavor text entry
        if (speciesData.flavor_text_entries.length > 0) {
          setSelectedVersion(
            speciesData.flavor_text_entries.find(
              (entry: any) => entry.language.name === "en"
            ).version.name
          );
        }
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

  // Filter for English flavor_text_entries
  const englishFlavorTextEntries = species.flavor_text_entries.filter(
    (entry: any) => entry.language.name === "en"
  );

  // Get the flavor text for the selected version
  const selectedFlavorTextEntry = englishFlavorTextEntries.find(
    (entry: any) => entry.version.name === selectedVersion
  );

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

        {/* Dropdown to select the version */}
        <div>
          <h3>Select Version</h3>
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            {englishFlavorTextEntries.map((entry: any, index: number) => (
              <option key={index} value={entry.version.name}>
                {entry.version.name}
              </option>
            ))}
          </select>
        </div>

        {/* Display selected flavor text */}
        {selectedFlavorTextEntry && (
          <div>
            <h3>Selected Flavor Text Entry</h3>
            <p>
              <strong>{selectedFlavorTextEntry.version.name}:</strong>{" "}
              {selectedFlavorTextEntry.flavor_text.replace(/\n/g, " ")}
            </p>
          </div>
        )}

        {/* Display other fields */}
        <h3>Other Details</h3>
        <p>
          <strong>ID:</strong> {species.id}
        </p>
        <p>
          <strong>Order:</strong> {species.order}
        </p>
        <p>
          <strong>Gender Rate:</strong> {species.gender_rate}
        </p>

        {/* Add more fields as needed */}

        <pre>{JSON.stringify(species)}</pre>
      </div>
    </div>
  );
};

export default Pokemon;