import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Song service for song-related operations

export const getSongById = async (songId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/song/${songId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(error.response.data.error || "Song not found");
      }
      throw new Error(
        error.response.data.error || "Error occurred while fetching the song"
      );
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Error occurred while setting up the request");
    }
  }
};

// Search for a song by given string
export const searchSongAPI = async (query: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/song/search`, {
      params: { name: query },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(error.response.data.error || "Song not found");
      }
      throw new Error(
        error.response.data.error ||
          "Error occurred while searching for the song"
      );
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Error occurred while setting up the request");
    }
  }
};

// get song by id
export async function getSongDetails(songId: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/song/songId`, {
      params: { name: songId },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("response from the server:", response);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch song details:", err);
    throw err;
  }
}
