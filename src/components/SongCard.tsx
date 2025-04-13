import React from "react";
import Song from "../models/Song";
import { useNavigate } from "react-router-dom";
import "../assets/styles/components/Card.css";
import { startSongEvent } from "../services/socketService";

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId") || "";

  const handleClick = () => {
    navigate("/live", { state: { song } });
    startSongEvent(song._id, sessionId);
    console.log(`Song clicked: ${song.name}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-top">
        {song.image && (
          <img
            className="card-img"
            src={song.image}
            alt={`${song.name} cover`}
          />
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
