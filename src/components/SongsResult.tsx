// src/components/SongsResult.tsx
import React from 'react';
import Song from '../models/Song';
import SongCard from './SongCard';
import "../assets/styles/components/SongsResult.css";  // Import the CSS file

interface SongsResultProps {
  songs: Song[];
}

const SongsResult: React.FC<SongsResultProps> = ({ songs }) => {
  return (
    <div className="songs-result">
      <h1>Search Results</h1>
      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard key={song._id || song.name} song={song} />
        ))}
      </div>        
    </div>
  );
};

export default SongsResult;
