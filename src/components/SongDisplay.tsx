// src/components/SongDisplay.tsx
import React from 'react';
import Song from '../models/Song';
import SongLine from './SongLine';

interface SongDisplayProps {
  song: Song;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ song }) => {
  // Get the role from localStorage. Assume if the role is "singer", only lyrics should be shown.
  const instrument = localStorage.getItem("instrument") || "";
  const onlyLyrics = instrument === "singer";

  return (
    <div className="song-display">
      <h2>{song.name}</h2>
      <h3>{song.artist}</h3>
      {song.body.map((line, index) => (
        // Render each line using SongLine, passing down the onlyLyrics prop.
        <SongLine key={index} line={line} onlyLyrics={onlyLyrics} />
      ))}
    </div>
  );
};

export default SongDisplay;
