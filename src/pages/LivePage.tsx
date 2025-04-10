// src/pages/LivePage.tsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import Song from '../models/Song'; // Your Song type/interface
import Button from '../components/Button';

// Define the expected shape of location.state
interface LocationState {
  song: Song;
}

const LivePage: React.FC = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");
  
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
      {/* Conditionally render the Quit button only if role is "admin" */}
      {role === "admin" && (
        <Button type="button" label="Quit" onClick={() => console.log("click")} />
      )}
    </div>
  );
};

export default LivePage;