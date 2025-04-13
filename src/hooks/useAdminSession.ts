import { useState } from "react";
import { searchSongAPI, getSongById } from "../services/songService";
import { createSessionAPI } from "../services/sessionService";
import Song from "../models/Song";
import { joinSessionSocket, connectSocket } from "../services/socketService";

const useAdminSession = () => {
  const [error, setError] = useState<string | null>(null);

  // Create a new session by the admin
  const createSession = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Admin token is missing. Please login as admin.");
      return;
    }

    try {
      const response = await createSessionAPI(token);
      if (response.status === 201) {
        localStorage.setItem("sessionId", response.data._id);
        connectSocket(); // Connect to the socket server
        joinSessionSocket(response.data._id, response.data.admin); // Create a room using the session ID
      } else {
        throw new Error("Failed to create session.");
      }
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Error occurred while creating session.";
      setError(errorMessage);
    }
  };

  // Search for a song using the provided query string.
  const searchSong = async (query: string) => {
    try {
      const response = await searchSongAPI(query);

      if (response.status === 200) {
        return response.data;
      } else {
        setError("No song found. Please try a different search.");
      }
    } catch (err) {
      setError("Error occurred while searching for the song.");
      throw err;
    }
  };

  const songDetails = async (songIds: string[]): Promise<Song[]> => {
    try {
      const songs = await Promise.all(songIds.map((id) => getSongById(id)));

      return songs;
    } catch (err) {
      setError("Error occurred while searching for the songs.");
      throw err;
    }
  };

  return { error, createSession, searchSong, songDetails };
};

export default useAdminSession;
