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
import { disconnectSocket, disconnectEvent, listenDisconnectEvent, listenSongEvent } from '../services/socketService'; 
import useSocketInitializer from "../hooks/useSocketInitializer";
import "../assets/styles/components/AdminMainPage.css";  

const AdminMainPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { error: searchError, searchSong, songDetails } = useAdminSession();
  const { logout } = useSession();
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const sessionId = localStorage.getItem("sessionId") || "";

  useSocketInitializer(sessionId);  // Initialize socket connection

  useEffect(() => {
    listenDisconnectEvent(() => {
      console.log("Received disconnect_event from server. Disconnecting socket and navigating to login.");
      disconnectSocket();
      localStorage.clear();
      navigate("/login");
    });

    listenSongEvent((data: { song: Song }) => {
      console.log("Song received from server:", data.song);
      navigate("/live", { state: { song: data.song } });
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
      console.log("foundSongId:", foundSongId);
      if (foundSongId) {
        const songs: Song[] = await songDetails(foundSongId);
        console.log("songs:", songs);
        setSearchResults(songs);
      } else {
        setError("No song found. Please try a different search.");
      }
    } catch (err) {
      setError("Error occurred while searching for the song. Please try again.");
    }
  };

  const handleLogout = async () => {
    console.log("enter handleLogout");
    try {
      disconnectEvent(sessionId);
      await logout();
    } catch (error) {
      throw error;
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
      
      {searchResults && searchResults.length > 0 && (
        <div className="songs-result-container">
          <SongsResult songs={searchResults} />
        </div>
      )}

      <Button type="button" label="Logout" onClick={handleLogout} />
    </div>
  );
};

export default AdminMainPage;