// src/hooks/useAdminSearch.ts

import { useState } from "react";
import { searchSongAPI } from "../services/songService";  // Import services
import { createSessionAPI } from "../services/sessionService";  // Import the session creation API

const useAdminSession = () => {
  const [error, setError] = useState<string | null>(null);
  const [sessionUrl, setSessionUrl] = useState<string | null>(null);  // For storing the session URL
  const [song, setSong] = useState<any | null>(null);  

  // Function to create a session
  const createSession = async () => {
    const token = localStorage.getItem("token");  // Get the admin token from localStorage

    if (!token) {
      setError("Admin token is missing. Please login as admin.");
      return;
    }

    try {
      // Include Authorization header with the token for the session creation request
      const response = await createSessionAPI(token);
      if (response.status === 201) {
        setSessionUrl(response.data.sessionUrl);  // Set the session URL if successful
        localStorage.setItem("sessionId", response.data._id);  // Save session ID in localStorage
      } else {
        throw new Error("Failed to create session.");
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "Error occurred while creating session.";
      setError(errorMessage);
    }
  };

  // Function to search for a song
  const searchSong = async (query: string) => {
    try {
      console.log("enter searchSong");  // Debugging log
      const response = await searchSongAPI(query); 
      console.log("response.status from the server:", response);  // Debugging log
      if (response.status === 200) {
        setSong(response.data);
        console.log("Song found:", response.data);  // Debugging log 
        return response.data;  // Return the song data
      } else {
        setSong(null); 
        setError("No song found. Please try a different search.");
      }
    } catch (err) {
      setError("Error occurred while searching for the song.");
      throw err;  // Propagate error to be handled by the component
    }
  };

  return { error, sessionUrl, song, createSession, searchSong };
};

export default useAdminSession;
