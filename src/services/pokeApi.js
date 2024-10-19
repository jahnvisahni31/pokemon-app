import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=150'; // Fetch 150 Pokémon

export const getPokemonList = async () => {
  const response = await axios.get(API_URL);
  return response.data.results;
};

export const getPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
