// src/pages/GamePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { getGameById } from "../services/api";

const GamePage = () => {
  const { id } = useParams();
  //temporarly set to a mock data
  const [game, setGame] = useState({
    name: 'avatar',
    image: 'aaa',
    description: 'aaaaaaaaaaaaaaaaa',
    genre: 'gggggggg',
    price: '50',
    releaseDate: '20-12-2024',
  });
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchGameDetails = async () => {
  //     try {
  //       const data = await getGameById(id);
  //       setGame(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching game details:", error);
  //     }
  //   };
  //   fetchGameDetails();
  // }, [id]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="game-page">
      <h1>{game.name}</h1>
      <img src={`${game.image}`} alt={game.name} />
      <p>{game.description}</p>
      <p>Genre: {game.genre}</p>
      <p>Price: {game.price} USD</p>
      <p>Release Date: {game.releaseDate}</p>
    </div>
  );
};

export default GamePage;
