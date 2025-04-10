// src/components/SongCard.tsx

import React from "react";
import Song from "../models/Song"; // Your Song type/interface
import { useNavigate } from "react-router-dom";
import "../assets/styles/components/Card.css";
import { startSongEvent } from "../services/socketService"; // Import your analytics function

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId") || ""; // Get the session ID from local storage


  const handleClick = () => {
    // Navigate to the "/live" page and pass the song ID via state
    navigate("/live", { state: { song } });
    startSongEvent(song._id, sessionId); // Send the custom event to the server
    console.log(`Song clicked: ${song.name}`); // Debugging log
  };

  return (
    <div className="card">
      <div className="top">
        <h2 className="name" onClick={handleClick}>{song.name}</h2>
        {song.image && (
          <img className="circle-img" src={song.image} alt={`${song.name} cover`} />
        )}
      </div>
      <div className="bottom">
        <p className="info">Artist: {song.artist}</p>
        {/* You can add more details here. For example, if you have a phone number, email, or any other info */}
      </div>
    </div>
  );
};

export default SongCard;
