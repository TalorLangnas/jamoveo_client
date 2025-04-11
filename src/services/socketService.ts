// src/services/socketIoService.ts
import io from "socket.io-client";
import Song from "../models/Song"; // Adjust the path if needed

// Connect to the Socket.IO server at the specified URL
const socket = io("http://localhost:5000", {
  autoConnect: false, 
}); 

export const connectSocket = () => {
  socket.connect();  // Connect to the server
  console.log("Socket connected...");  // Debbug Log the socket ID
}
export const disconnectSocket = () => {
  socket.disconnect();  // Disconnect from the server
}

// Listen for a connection confirmation
socket.on("connect", () => {
  console.log("Connected to server with id:", socket.id); // Debbug Log the socket ID
});


// Function to emit a join_session event to the server with necessary data
export const joinSessionSocket = (sessionId: string, userId?: string): void => {
    if (sessionId) {
      socket.emit("join_session", { sessionId, userId });
      console.log(`Requested join_session for session: ${sessionId}, userId: ${userId}`);
    } else {
      console.error("Session ID not provided");
    }
  };

  export const startSongEvent = (songId: string, sessionId: string): void => {
    console.log("entered startSongEvent function"); // Debugging log
    if (songId && sessionId) {
      socket.emit("start_song", { songId, sessionId });
      console.log(`Emitted start_song event for song id: ${songId} in session: ${sessionId}`);
    } else {
      console.error("Song id or session id not provided");
    }
  };

  // Function to listen for the start_song event from the server.
  // It takes a callback function that receives an object with a property 'song' (of type Song).
  export const listenSongEvent = (callback: (data: { song: Song }) => void): void => {
    socket.on("start_song", (data: { song: Song }) => {
      console.log("Received start_song event:", data);
      callback(data);
    });
  };

export const quitEvent = (sessionId: string | null): void => {
  console.log("entered quitEvent function"); // Debugging log
  if (sessionId) {
    socket.emit("quit_event", { sessionId });
    console.log(`Emitted quit_event event for session id: ${sessionId}`);
  } else {
    console.error("sssionId not provided");
  }
};

export const listenQuitEvent = (callback: () => void): void => {
  socket.on("quit_event", () => {
    console.log("Received quit_event from server");
    callback();
  });
};

export const disconnectEvent = (sessionId: string | null): void => {
  if (sessionId) {
    socket.emit("disconnect_event", { sessionId });
  } else {
    console.error("sssionId not provided");
  }
};

export const listenDisconnectEvent = (callback: () => void): void => {
  socket.on("disconnect_event", () => {
    callback();
  });
};


