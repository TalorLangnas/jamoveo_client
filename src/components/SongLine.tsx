import React from "react";
import { ILine } from "../models/Song";
import "../assets/styles/components/SongLine.css";

interface SongLineProps {
  line: ILine;
  onlyLyrics?: boolean;
}

const SongLine: React.FC<SongLineProps> = ({ line, onlyLyrics = false }) => {
  return (
    <div className="song-line">
      {!onlyLyrics && (
        <div className="chords-row">
          {line.map((lineItem, index) => (
            <span key={index} className="chord">
              {lineItem.chords ? lineItem.chords : "\u00A0"}
            </span>
          ))}
        </div>
      )}
      <div className="lyrics-row">
        {line.map((lineItem, index) => (
          <span key={index} className="lyric">
            {lineItem.lyrics ? lineItem.lyrics : "\u00A0"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SongLine;
