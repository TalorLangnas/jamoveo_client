// // src/pages/AdminResultsPage.tsx (Tailwind CSS version)

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export interface Song {
//   _id: string;
//   name: string;
//   artist: string;
//   imageUrl?: string;
// }

// interface AdminResultsPageProps {
//   songs: Song[];
// }

// const AdminResultsPage: React.FC<AdminResultsPageProps> = ({ songs }) => {
//   const navigate = useNavigate();

//   const handleSongSelect = (song: Song) => {
//     navigate('/live', { state: { song } });
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-8">
//       <h1 className="text-4xl font-bold mb-6">Search Results</h1>
//       {songs.length === 0 && (
//         <p className="text-lg">No songs found. Please try a different search.</p>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {songs.map((song) => (
//           <div
//             key={song._id}
//             className="bg-white shadow rounded overflow-hidden cursor-pointer hover:shadow-lg transition"
//             onClick={() => handleSongSelect(song)}
//           >
//             {song.imageUrl && (
//               <img
//                 className="w-full h-40 object-cover"
//                 src={song.imageUrl}
//                 alt={song.name}
//               />
//             )}
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{song.name}</h2>
//               <p className="text-gray-600">{song.artist}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminResultsPage;

import React from 'react';

export interface Song {
  title: string;
  author: string;
  image?: string;
  // Optionally, if needed later, you could include full song data (lines, etc.)
  // lines?: { lyrics: string; chords?: string }[][];
}

export interface AdminResultPageProps {
  searchResults: Song[];
  onSelect: (song: Song) => void;
}

const AdminResultPage: React.FC<AdminResultPageProps> = ({ searchResults, onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Search Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchResults.map((song, index) => (
            <div
              key={index}
              onClick={() => onSelect(song)}
              className="cursor-pointer transform transition duration-300 hover:scale-105 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              {song.image ? (
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <div className="w-full text-center">
                <h2 className="text-2xl font-semibold">{song.title}</h2>
                <p className="text-xl text-gray-300">{song.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminResultPage;

