// src/services/songService.ts

import axios from "axios";

const API_URL = "http://localhost:5000";  // Replace with your actual backend URL

export const getSongById = async (songId: string) => {
  console.log("input in getSongById:", songId);  // Debugging log
  try {
    const token = localStorage.getItem("token");

    // Send the GET request using the song ID as a URL parameter
    const response = await axios.get(`${API_URL}/api/song/${songId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("Response from getSongById:", response.data);  // Debugging log
    return response.data;  // Return the song data from the response
  } catch (error: any) {
    // Check if error has response (from the server)
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(error.response.data.error || "Song not found");
      }
      // Handle other status codes or errors from the server
      throw new Error(error.response.data.error || "Error occurred while fetching the song");
    } else if (error.request) {
      // If no response from the server
      throw new Error("No response received from the server");
    } else {
      // If there's an error in setting up the request
      throw new Error("Error occurred while setting up the request");
    }
  }
};

// Function to search for a song 
export const searchSongAPI = async (query: string) => {
  console.log("enter searchSongAPI");  // Debugging log
  try {
    const token = localStorage.getItem("token");

    // Send the query as a query parameter in the URL
    const response = await axios.get(`${API_URL}/api/song/search`, {
      params: { name: query },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },  
    });
    console.log("Response from searchSongAPI:", response);  // Debugging log
    return response;  // Return the song data from the response
  } catch (error: any) {
    // Check if error has response (from the server)
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(error.response.data.error || "Song not found");
      }
      // Handle other status codes or errors from the server
      throw new Error(error.response.data.error || "Error occurred while searching for the song");
    } else if (error.request) {
      // If no response from the server
      throw new Error("No response received from the server");
    } else {
      // If there's an error in setting up the request
      throw new Error("Error occurred while setting up the request");
    }
  }
};

// get song by id
export async function getSongDetails(songId: string) {
  console.log("enter getSongDetails");  // Debugging log
  try {
    const token = localStorage.getItem("token");
    console.log("enter try block with token:", token);
    const response = await axios.get(`${API_URL}/api/song/songId`, {
      params: { name: songId },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("response from the server:", response);
    return response.data; // Expected to be: { name, artist, imageUrl? }
  } catch (err) {
    console.error('Failed to fetch song details:', err);
    throw err;
  }
}
