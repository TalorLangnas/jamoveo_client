// src/components/SongsResult.tsx
import React from 'react';
import Song from '../models/Song';
import SongCard from './SongCard';

// Define a prop interface for this component
interface SongsResultProps {
  songs: Song[];
}

const SongsResult: React.FC<SongsResultProps> = ({ songs }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {songs.map((song) => (
          <SongCard key={song._id || song.name} song={song} />
        ))}
      </div>        
    </div>
  );
};

export default SongsResult;
