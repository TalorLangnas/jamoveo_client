import io from "socket.io-client";
import Song from "../models/Song";

// Socket service for managing client-server communication using Socket.IO
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const socket = io(API_URL, {
  autoConnect: false,
});

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

socket.on("connect", () => {});

// Emit event for create/join session
export const joinSessionSocket = (sessionId: string, userId?: string): void => {
  if (sessionId) {
    socket.emit("join_session", { sessionId, userId });
  } else {
    console.error("Session ID not provided");
  }
};

// Emit event for start song event
export const startSongEvent = (songId: string, sessionId: string): void => {
  if (songId && sessionId) {
    socket.emit("start_song", { songId, sessionId });
    console.log(
      `Emitted start_song event for song id: ${songId} in session: ${sessionId}`
    );
  } else {
    console.error("Song id or session id not provided");
  }
};

// Listen for the start_song event from the server.
// It takes a callback function that receives an object with a  type of Song.
export const listenSongEvent = (
  callback: (data: { song: Song }) => void
): void => {
  socket.on("start_song", (data: { song: Song }) => {
    console.log("Received start_song event:", data);
    callback(data);
  });
};

// Emit quit event for inform all the users that the admin has quit the song
export const quitEvent = (sessionId: string | null): void => {
  console.log("entered quitEvent function"); // Debugging log
  if (sessionId) {
    socket.emit("quit_event", { sessionId });
    console.log(`Emitted quit_event event for session id: ${sessionId}`);
  } else {
    console.error("sssionId not provided");
  }
};

// Listen for the quit_event
export const listenQuitEvent = (callback: () => void): void => {
  socket.on("quit_event", () => {
    console.log("Received quit_event from server");
    callback();
  });
};

// Emit disconnect event for inform all the users that the admin has disconnected from the session
export const disconnectEvent = (sessionId: string | null): void => {
  if (sessionId) {
    console.log("entered disconnectEvent function"); // Debugging log
    socket.emit("disconnect_event", { sessionId });
  } else {
    console.error("sssionId not provided");
  }
};

// Listen for the disconnect_event
export const listenDisconnectEvent = (callback: () => void): void => {
  socket.on("disconnect_event", () => {
    callback();
  });
};
