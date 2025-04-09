// // src/pages/AdminResultsPage.tsx

// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import SongCard from '../components/SongCard';

// // Define a type for the location state
// // interface LocationState {
// //   searchResults: SongCard[];
// // }

// // write hardcoded SongCard for testing
// const songCardData = [
//   {
//     name: "Song Title 1",
//     artist: "Artist 1",
//     imageUrl: "https://via.placeholder.com/150"
//   },
//   {
//     name: "Song Title 2",
//     artist: "Artist 2",
//     imageUrl: "https://via.placeholder.com/150"
//   },
//   {
//     name: "Song Title 3",
//     artist: "Artist 3",
//     imageUrl: "https://via.placeholder.com/150"
//   }
// ];

// const AdminResultsPage: React.FC = () => {
//   return (
//     <div>
//       <SongCard title="Hello, TypeScript!" />
//     </div>
//   );
// };

// export default AdminResultsPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAdminSession from "../hooks/useAdminSession";  

export interface Song {
  title: string;
  author: string;
  image?: string;
}



// const AdminResultPage: React.FC<AdminResultPageProps> = ({ searchResults, onSelect }) => {
const AdminResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location:", location); // Debugging log
  const { songDetails } = useAdminSession();
  // Retrieve the state passed via navigate
  const state = location.state as string | undefined;
  const searchResultsArr = location.state.searchResults as string[] | undefined;
  console.log('searchResultsArr:', searchResultsArr); // Debugging log

  useEffect(() => {
    if (!searchResultsArr) {
      // If no state is found, redirect to the main page or handle accordingly
      navigate("/admin");
    } else {
      // Define an immediately invoked async function expression (IIFE)
      (async () => {
        try {
          const foundSong = await songDetails(searchResultsArr); // Assuming you want to fetch details for the first song in the array
          console.log("foundSong:", foundSong);  // Debugging log
        } catch (err) {
          console.error("Error occurred while searching for the song. Please try again.", err);
        }
      })();
    }
  }, [state, navigate, songDetails]);




  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Search Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
        </div>
      </div>
    </div>
  );
};

export default AdminResultPage;