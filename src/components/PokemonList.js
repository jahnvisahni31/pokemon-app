import React, { useState, useEffect } from 'react';
import { getPokemonList } from '../services/pokeApi';
import SearchBar from './SearchBar';
import DittoDetails from './Dittodetails';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State to hold selected Pokémon

  useEffect(() => {
    async function fetchPokemon() {
      const data = await getPokemonList();
      setPokemon(data);
      setFilteredPokemon(data);
      setLoading(false);
    }

    fetchPokemon();
  }, []);

  const handleSearch = (query) => {
    const filtered = pokemon.filter(poke =>
      poke.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  const handlePokemonClick = (poke) => {
    setSelectedPokemon(poke); // Set the selected Pokémon
  };

  const handleBack = () => {
    setSelectedPokemon(null); // Reset to show the Pokémon list
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {!selectedPokemon ? ( // Conditional rendering based on selectedPokemon
        <>
          <SearchBar onSearch={handleSearch} />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {filteredPokemon.map((poke, index) => (
              <div 
                key={index} 
                className="border p-4 bg-gray-700 text-white cursor-pointer transition duration-200 hover:bg-gray-600" 
                onClick={() => handlePokemonClick(poke)}
              >
                {poke.name.toUpperCase()}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button 
            onClick={handleBack} 
            className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back
          </button>
          <DittoDetails pokeName={selectedPokemon.name} /> {/* Render DittoDetails */}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
