// src/pages/AdminMainPage.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminSession from "../hooks/useAdminSession";  
import InputField from "../components/InputField";  
import Button from "../components/Button"; 
import useSession from "../hooks/useSession"; 
import "../assets/styles/components/App.css"; 
import Song from '../models/Song';  
import SongsResult from "../components/SongsResult";
import { disconnectSocket, disconnectEvent, listenDisconnectEvent } from '../services/socketService'; // Adjust the path if necessary

const AdminMainPage = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { error: searchError, searchSong, songDetails } = useAdminSession();
  const { logout } = useSession();  // Using logout from useSession
  const [searchResults, setSearchResults] = useState<Song[]>([]);  // State to store search results
  const sessionId = localStorage.getItem("sessionId") || ""; // Get the session ID from local storage

  useEffect(() => {
    // Listen for the "disconnect_event" event
    listenDisconnectEvent(() => {
      console.log("Received disconnect_event from server. Disconnecting socket and navigating to login.");
      disconnectSocket(); // Close the socket connection
      localStorage.clear(); // Clear local storage
      navigate("/login");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a valid search query.");
      return;
    }

    try {
      const foundSongId = await searchSong(query);
      console.log("foundSongId:", foundSongId);  // Debugging log
      if (foundSongId){
        // navigate("/admin/results", { state: { searchResults: [foundSongId] } });
        const songs: Song[] = await songDetails([foundSongId]);
        console.log("songs:", songs);  // Debugging log
        setSearchResults(songs);
      } else {
        console.log("enter to error");  // Debugging log
        setError("No song found. Please try a different search.");
      }
    } catch (err) {
      setError("Error occurred while searching for the song. Please try again.");
    }
  };

  const handleLogout = async () => {
    console.log("enter handleLogout");  // Debugging log
    try {
      await logout();
      disconnectEvent(sessionId);  // Disconnect the event listener
    } catch (error) {
      throw error;  // Propagate error to be handled by the component
    }
  };

  return (
    <div className="admin-main-page">
      <h2>Search any song...</h2>
      {error && <div className="error">{error}</div>}
      {searchError && <div className="error">{searchError}</div>}

      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Enter song name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" label="Search" />
      </form>
      <div>
        {searchResults && searchResults.length > 0 && (
          <SongsResult songs={searchResults} />  // Render the SongsResult component with the search results
        )}
      </div>
      <Button type="button" label="Logout" onClick={handleLogout} />  {/* Logout button */}
    </div>
  );
};

export default AdminMainPage;
