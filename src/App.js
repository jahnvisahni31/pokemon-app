import React from 'react';
import PokemonList from './components/PokemonList';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <PokemonList />
    </div>
  );
};

export default App;
