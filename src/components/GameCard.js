import React from "react";
import { Link } from "react-router-dom";
const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={`${game.image}`} alt={game.name} />
      <div className="game-info">
        <h3>{game.name}</h3>
        <p className="game-genre">{game.genre}</p>
        <p className="game-price">${game.price.toFixed(2)}</p>
        <Link to={`game/${game.id}`}>
        <button className="view-details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
