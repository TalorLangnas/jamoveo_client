import React, { useRef } from "react";
import Song from "../models/Song";
import SongLine from "./SongLine";
import AutoScrollToggle from "./AutoScrollToggle";
import "../assets/styles/components/SongDisplay.css";

interface SongDisplayProps {
  song: Song;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ song }) => {
  const instrument = localStorage.getItem("instrument") || "";
  const onlyLyrics = instrument === "singer";
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
      <AutoScrollToggle scrollContainerRef={scrollContainerRef} />
    </div>
  );
};

export default SongDisplay;
