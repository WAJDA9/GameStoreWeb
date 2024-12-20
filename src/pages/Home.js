import React, { useEffect, useState } from 'react';
import { getGames } from "../services/api";
import GameCard from '../components/GameCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleAddGameClick = () => {
    navigate('/add_game');
  };
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (err) {
        console.error("Error in Home:", err);
        setError(err.message || "Failed to load games.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
 

  return (
    <div className="home-page">
      <nav className="navbar">
        <h1 className="navbar-title">Game Store</h1>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={handleAddGameClick} className="navbar-btn">
          Add Game
        </button>
      </nav>
      <div className="game-list">
        {games.length > 0 ? (
          games.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
          <p>No games available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
