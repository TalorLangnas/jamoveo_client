import React from 'react';
import { useLocation } from 'react-router-dom';

const LivePage: React.FC = () => {
  const location = useLocation();
  
  // Extract the songId passed via state
  const state = location.state as { songId: string } | undefined;
  const songId = state?.songId || 'No song ID provided';

  return (
    <div className="live-page" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Live Page</h1>
      <p>Song ID: {songId}</p>
    </div>
  );
};

export default LivePage;