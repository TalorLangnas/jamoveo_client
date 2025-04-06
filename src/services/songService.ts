// src/services/songService.ts

import axios from "axios";

const API_URL = "http://localhost:5000";  // Replace with your actual backend URL

// Function to search for a song
export const searchSongAPI = async (query: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/song/search`, { query });
    return response.data;  // Return the song data from the response
  } catch (error) {
    throw new Error("Error occurred while searching for the song.");
  }
};
