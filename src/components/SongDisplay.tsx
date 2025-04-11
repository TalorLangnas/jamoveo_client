// src/components/SongDisplay.tsx
import React, { useRef } from "react";
import Song from "../models/Song";
import SongLine from "./SongLine";
import AutoScrollToggle from './AutoScrollToggle'
import "../assets/styles/components/SongDisplay.css"; // Adjust the path as necessary

interface SongDisplayProps {
  song: Song;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ song }) => {
  // Decide if only lyrics should be shown (for singers)
  const instrument = localStorage.getItem("instrument") || "";
  const onlyLyrics = instrument === "singer";

  // Create a ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="song-display-wrapper">
      <div className="song-display-container" ref={scrollContainerRef}>
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
        {song.body.map((line, index) => (
          <SongLine key={index} line={line} onlyLyrics={onlyLyrics} />
        ))}
      </div>
      {/* Include the auto-scroll toggle button as a separate floating component */}
      <AutoScrollToggle scrollContainerRef={scrollContainerRef} />
    </div>
  );
};

export default SongDisplay;
