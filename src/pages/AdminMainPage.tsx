// src/pages/AdminMainPage.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAdminSession from "../hooks/useAdminSession";  // Custom hook for admin session logic
import InputField from "../components/InputField";  // Reusable input component
import Button from "../components/Button";  // Reusable button component
import useSession from "../hooks/useSession";  // Import the new session hook
import "../assets/styles/components/App.css";  // Importing the CSS for styling
import Song from '../models/Song';  // Import the Song type
import SongsResult from "../components/SongsResult";

const AdminMainPage = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // const { error: searchError, sessionUrl, song, createSession, searchSong } = useAdminSession();
  const { error: searchError, sessionUrl, createSession, searchSong, songDetails } = useAdminSession();
  const { error: sessionError, logout } = useSession();  // Using logout from useSession
  const [searchResults, setSearchResults] = useState<Song[]>([]);  // State to store search results
  const sessionCreatedRef = useRef(false);
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    if (!sessionCreatedRef.current) {
      createSession();
      sessionCreatedRef.current = true;
    }
  }, []);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!query.trim()) {
  //     setError("Please enter a valid search query.");
  //     return;
  //   }

  //   try {
  //     const foundSongId = await searchSong(query);
  //     console.log("foundSongId:", foundSongId);  // Debugging log
  //     if (foundSongId){
  //       navigate("/admin/results", { state: { searchResults: [foundSongId] } });
  //     } else {
  //       setError("No song found. Please try a different search.");
  //     }
  //   } catch (err) {
  //     setError("Error occurred while searching for the song. Please try again.");
  //   }
  // };
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

  const handleCopyClick = () => {
    if (sessionUrl) {
      const tempInput = document.createElement("input");
      tempInput.value = sessionUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("Session URL copied to clipboard!");
    }
  };

  const handleLogout = async () => {
    const success = await logout();  // Call the logout function from the hook

    if (success) {
      localStorage.clear();  
      navigate("/login");  // Redirect to login page
    } else {
      alert("Logout failed. Please try again.");
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

      {sessionUrl && (
        <div>
          <p>Session created successfully! Here is your session URL:</p>
          <div className="session-url">
            <span>{sessionUrl}</span>
            <Button type="button" label="Copy URL" onClick={handleCopyClick} />
          </div>
        </div>
      )}

      <Button type="button" label="Logout" onClick={handleLogout} />  {/* Logout button */}
    </div>
  );
};

export default AdminMainPage;
