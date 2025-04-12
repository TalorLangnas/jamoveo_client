// src/pages/PlayerMainPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listenSongEvent, listenDisconnectEvent, disconnectSocket } from "../services/socketService"; 
import useSocketInitializer from "../hooks/useSocketInitializer";
import Song from "../models/Song";
import DotsLoader from "../components/DotsLoader"; // Import the loader component
import "../assets/styles/components/PlayerMainPage.css"; // Import the CSS file for styling

const PlayerMainPage: React.FC = () => {
  const sessionId = localStorage.getItem("sessionId") || "";
  useSocketInitializer(sessionId);
  const navigate = useNavigate();

  useEffect(() => {
    // Listener for "start_song" event
    listenSongEvent((data: { song: Song }) => {
      console.log("Song received from server:", data.song);
      navigate("/live", { state: { song: data.song } });
    });

    // Listener for "disconnect_event" event
    listenDisconnectEvent(() => {
      console.log("Received disconnect_event from server. Disconnecting socket and navigating to login.");
      disconnectSocket();
      localStorage.clear();
      navigate("/login");
    });
  }, [navigate]);

  return (
    <div className="player-main-page">
      <h1>Welcome to the rehearsal</h1>
      <div className="waiting-container">
        <p className="waiting-text">Waiting for the admin to start the song</p>
        <DotsLoader />
      </div>
    </div>
  );
};

export default PlayerMainPage;
