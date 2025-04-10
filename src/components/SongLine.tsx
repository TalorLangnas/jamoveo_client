// src/components/SongLine.tsx
import React from 'react';
import { ILine } from '../models/Song';
import '../assets/styles/components/SongLine.css'; 

interface SongLineProps {
  line: ILine;
  onlyLyrics?: boolean;
}

const SongLine: React.FC<SongLineProps> = ({ line, onlyLyrics = false }) => {
  return (
    <div className="song-line">
      {line.map((lineItem, index) => (
        <div key={index} className="line-item">
          {!onlyLyrics && lineItem.chords && (
            <span className="line-chords">{lineItem.chords}</span>
          )}
          {lineItem.lyrics && (
            <span className="line-lyrics">{lineItem.lyrics}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SongLine;



