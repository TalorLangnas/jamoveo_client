// src/services/songService.ts

import axios from "axios";

const API_URL = "http://localhost:5000";  // Replace with your actual backend URL

// Function to create a session
export const createSessionAPI = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/session`,
      {}, // You can pass the body if needed, but in this case, it's empty
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the admin token in the Authorization header
        },
      }
    );
    console.log("Response from createSessionAPI:", response);  // Debugging log
    return response;  // Return the full response to be handled in the component
  } catch (error) {
    throw new Error("Error occurred while creating session.");
  }
};

// Function to search for a song
export const searchSongAPI = async (query: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/song/search`, { query });
    return response.data;  // Return the song data from the response
  } catch (error) {
    throw new Error("Error occurred while searching for the song.");
  }
};
