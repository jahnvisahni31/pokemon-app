// src/components/DittoDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DittoDetails = ({ pokeName }) => {
  const [pokeData, setPokeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
      setPokeData(response.data);
      setLoading(false);
    };

    fetchPokemonDetails();
  }, [pokeName]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-4 p-4 border bg-gray-800 text-white">
      <h2 className="text-xl font-semibold">{pokeData.name.toUpperCase()}</h2>
      <p>Height: {pokeData.height}</p>
      <p>Weight: {pokeData.weight}</p>
      <p>Base Experience: {pokeData.base_experience}</p>

      <h3>Abilities:</h3>
      <ul>
        {pokeData.abilities.map((ability, index) => (
          <li key={index}>
            {ability.ability.name} {ability.is_hidden && '(Hidden)'}
          </li>
        ))}
      </ul>

      <h3>Cries:</h3>
      <audio controls>
        <source src={pokeData.cries.latest} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      <h3>Forms:</h3>
      <ul>
        {pokeData.forms.map((form, index) => (
          <li key={index}>{form.name}</li>
        ))}
      </ul>

      <h3>Game Indices:</h3>
      <ul>
        {pokeData.game_indices.map((game, index) => (
          <li key={index}>
            {game.version.name} (Index: {game.game_index})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DittoDetails;
