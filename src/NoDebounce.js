import React, { useState, useEffect } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    async function fetchPokemon() {
      if (query.trim() === "") {
        setPokemon({});
        return;
      }
      setLoading(true);
      setRequestCount(requestCount + 1);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      const data = await res.json();
      setPokemon(data);
      setLoading(false);
    }
    fetchPokemon();
  }, [query]);

  return (
    <div className="pokedex">
      <h1>Pokédex</h1>
      <input
        type="text"
        placeholder="Enter Pokémon name or number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Total requests: {requestCount}</p>
      {loading && <div className="loading">Loading...</div>}
      {pokemon.name && (
        <div className="results">
          <h2>{pokemon.name}</h2>
          <div
            className="sprite"
            style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
          />
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
        </div>
      )}
    </div>
  );
};

export default App;
