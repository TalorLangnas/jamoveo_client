import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Song from "../models/Song";
import { listenQuitEvent, quitEvent } from "../services/socketService";
import Button from "../components/Button";
import SongDisplay from "../components/SongDisplay";
import useSocketInitializer from "../hooks/useSocketInitializer";
import "../assets/styles/components/LivePage.css";

interface LocationState {
  song: Song;
}

const LivePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const sessionId = localStorage.getItem("sessionId") || "";

  useSocketInitializer(sessionId);

  useEffect(() => {
    listenQuitEvent(() => {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/player");
      }
    });
  }, [navigate, role]);

  const state = location.state as LocationState | undefined;
  const song = state?.song;

  if (!song) {
    return (
      <div className="live-page">
        <h1>No song data provided</h1>
      </div>
    );
  }

  return (
    <div className="live-page">
      <div className="live-header">
        <h1>Live Performance</h1>
        <p>
          {song.name} <span className="separator">|</span> {song.artist}
        </p>
      </div>
      {song.image && (
        <div className="live-image-container">
          <img
            className="live-image"
            src={song.image}
            alt={`${song.name} cover`}
          />
        </div>
      )}
      <div className="live-content">
        <SongDisplay song={song} />
      </div>
      {role === "admin" && (
        <div className="live-quit">
          <Button
            type="button"
            label="Quit"
            onClick={() => quitEvent(sessionId)}
          />
        </div>
      )}
    </div>
  );
};

export default LivePage;
