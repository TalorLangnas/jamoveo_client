// src/pages/AdminResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAdminSession from "../hooks/useAdminSession";
import Song from '../models/Song';  // Import the Song type
import SongCard from '../components/SongCard';  // Import the SongCard component

const AdminResultPage = () => {
  const [foundSongs, setFoundSongs] = useState<Song[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  

  // Assume the search results are passed as an array of song IDs in location.state.searchResults
  const searchResultsArr = (location.state && (location.state as any).searchResults) as string[] | undefined;
  console.log('searchResultsArr:', searchResultsArr);

  const { songDetails } = useAdminSession();

  useEffect(() => {
    if (!searchResultsArr || searchResultsArr.length === 0) {
      // No valid song IDs – redirect to admin page.
      navigate("/admin");
    } else {
      (async () => {
        try {
          // songDetails accepts an array of song IDs and returns an array of song objects.
          const songs: Song[] = await songDetails(searchResultsArr);
          console.log("foundSongs:", songs);
          setFoundSongs(songs);
        } catch (err) {
          console.error("Error occurred while searching for the songs. Please try again.", err);
        }
      })();
    }
    // Empty dependency array ensures this runs only once on mount.
  }, []); 
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Search Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map over the foundSongs array and render a SongCard for each song */}
          {foundSongs.map((song) => (
            <SongCard key={song._id || song.name} song={song} />
          ))}
        </div>        
      </div>
    </div>
  );
};

export default AdminResultPage;
