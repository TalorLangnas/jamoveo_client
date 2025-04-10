// src/services/socketIoService.ts
import io from "socket.io-client";


// Connect to the Socket.IO server at the specified URL
const socket = io("http://localhost:5000", {
  autoConnect: false, 
}); 

export const connectSocket = () => {
  socket.connect();  // Connect to the server
  console.log("Socket connected...");  // Debbug Log the socket ID
}

// Listen for a connection confirmation
socket.on("connect", () => {
  console.log("Connected to server with id:", socket.id); // Debbug Log the socket ID
});


// // Function to emit a start_session event to the server with necessary data
// export const startSession = (sessionId: string, adminId?: string, song?: any): void => {
//   if (sessionId) {
//     // Emit the start_session event with sessionId, adminId, and song details
//     socket.emit("start_session", { sessionId, adminId, song });
//     console.log(`Requested start_session for session: ${sessionId}, adminId: ${adminId}, song: ${JSON.stringify(song)}`);
//   } else {
//     console.error("No session ID provided");
//   }
// };

// Function to emit a join_session event to the server with necessary data
export const joinSessionSocket = (sessionId: string, userId?: string): void => {
    if (sessionId) {
      socket.emit("join_session", { sessionId, userId });
      console.log(`Requested join_session for session: ${sessionId}, userId: ${userId}`);
    } else {
      console.error("Session ID not provided");
    }
  };
