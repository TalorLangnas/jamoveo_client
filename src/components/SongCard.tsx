import React from "react";
import Song from "../models/Song"; // Your Song type/interface
import "../assets/styles/components/Card.css";

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {

  const handleClick = () => {
    console.log("click");
  }

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
