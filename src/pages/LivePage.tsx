// src/pages/LivePage.tsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Song from '../models/Song'; // Your Song type/interface
import { listenQuitEvent, quitEvent } from '../services/socketService'; // Adjust the path if necessary
import Button from '../components/Button';
import SongDisplay from '../components/SongDisplay'; 

// Define the expected shape of location.state
interface LocationState {
  song: Song;
}

const LivePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const sessionId = localStorage.getItem("sessionId");
  
  useEffect(() => {
    // Set up the listener for the "quit_event" and navigate on receipt.
    listenQuitEvent(() => {
      console.log("Processing quit event action");
      if (role === "admin") {
        console.log("Admin quit event received, navigating to main page");
        navigate("/admin");
      } else {
        console.log("Player quit event received, navigating to main page");
        navigate("/waiting");
      }
    });
  }, [navigate]);

  
  // Extract the songId passed via state
  const state = location.state as LocationState | undefined;
  const song = state?.song;

  if (!song) {
    return (
      <div className="live-page" style={{ padding: '20px', textAlign: 'center' }}>
        <h1>No song data provided</h1>
      </div>
    );
  }

  return (
    <div className="live-page" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Live Page</h1>
      <p>Song: {song.name}</p>
      <p>Artist: {song.artist}</p>
      {song.image && <img src={song.image} alt={`${song.name} cover`} />}
      <SongDisplay song={song} />
      {/* Conditionally render the Quit button only if role is "admin" */}
      {role === "admin" && (
        <Button type="button" label="Quit" onClick={() => {quitEvent(sessionId)}} />
      )}
    </div>
  );
};

export default LivePage;