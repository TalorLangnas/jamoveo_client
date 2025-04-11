// src/pages/PlayerMainPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listenSongEvent, listenDisconnectEvent, disconnectSocket } from "../services/socketService"; // Adjust the path if necessary
import Song from "../models/Song";

const PlayerMainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the listener for the "start_song" event.
    listenSongEvent((data: { song: Song }) => {
      console.log("Song received from server:", data.song);
      // When the event is received, navigate to the Live Page with the song data.
      navigate("/live", { state: { song: data.song } });
    });

    // Listen for the "disconnect_event" event
    listenDisconnectEvent(() => {
      console.log("Received disconnect_event from server. Disconnecting socket and navigating to login.");
      disconnectSocket(); // Close the socket connection
      localStorage.clear(); // Clear local storage
      navigate("/login");
    });
  }, [navigate]);

  return (
    <div className="player-main-page">
      <h2>Welcome to the Player Main Page</h2>
      <h3>Waiting for the admin to start the song...</h3>
      <p>You are now part of the session.</p>
    </div>
  );
};

export default PlayerMainPage;
