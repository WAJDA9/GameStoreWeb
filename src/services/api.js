import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.7:5007/games';

export const getGames = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const getGameById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game by id:', error);
    throw error;
  }
};

export const addGame = async (game) => {
  try {
    const response = await axios.post(API_BASE_URL, game);
    return response.data;
  } catch (error) {
    console.error("Error adding game:", error);
    throw error;
  }
}
