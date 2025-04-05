// src/hooks/useAdminSearch.ts

import { useState } from "react";
import { createSessionAPI, searchSongAPI } from "../services/songService";  // Import services

const useAdminSearch = () => {
  const [error, setError] = useState<string | null>(null);
  const [sessionUrl, setSessionUrl] = useState<string | null>(null);  // For storing the session URL

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
      } else {
        throw new Error("Failed to create session.");
      }
    } catch (err) {
      setError("Error occurred while creating session.");
    }
  };

  // Function to search for a song
  const searchSong = async (query: string) => {
    try {
      await searchSongAPI(query);  // Call the API to search for a song
      setError(null);  // Reset error if the search was successful
    } catch (err) {
      setError("Error occurred while searching for the song.");
      throw err;  // Propagate error to be handled by the component
    }
  };

  return { error, sessionUrl, createSession, searchSong };
};

export default useAdminSearch;
