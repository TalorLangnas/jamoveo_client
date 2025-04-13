import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  listenSongEvent,
  listenDisconnectEvent,
  disconnectSocket,
} from "../services/socketService";
import useSocketInitializer from "../hooks/useSocketInitializer";
import Song from "../models/Song";
import DotsLoader from "../components/DotsLoader";
import "../assets/styles/components/PlayerMainPage.css";

const PlayerMainPage: React.FC = () => {
  const sessionId = localStorage.getItem("sessionId") || "";
  useSocketInitializer(sessionId);
  const navigate = useNavigate();

  useEffect(() => {
    listenSongEvent((data: { song: Song }) => {
      navigate("/live", { state: { song: data.song } });
    });

    listenDisconnectEvent(() => {
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
