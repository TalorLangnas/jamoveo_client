// src/components/SongCard.tsx
import React from "react";
import Song from "../models/Song"; // Your Song type/interface
import { useNavigate } from "react-router-dom";
import "../assets/styles/components/Card.css"; // New CSS file for styling
import { startSongEvent } from "../services/socketService"; // Function to send event

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId") || ""; // Get the session ID

  const handleClick = () => {
    // Navigate to LivePage with the song in state and notify the server
    navigate("/live", { state: { song } });
    startSongEvent(song._id, sessionId);
    console.log(`Song clicked: ${song.name}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-top">
        {song.image && (
          <img className="card-img" src={song.image} alt={`${song.name} cover`} />
        )}
        <div className="card-title">
          <h2>{song.name}</h2>
        </div>
      </div>
      <div className="card-bottom">
        <p className="card-info">Artist: {song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
