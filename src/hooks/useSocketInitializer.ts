import { useEffect } from "react";
import { connectSocket, joinSessionSocket } from "../services/socketService";

// Custom hook to initialize the socket connection and join a session
const useSocketInitializer = (sessionId: string, userId?: string) => {
  useEffect(() => {
    connectSocket();
    if (sessionId) {
      joinSessionSocket(sessionId, userId);
    }
  }, [sessionId, userId]);
};

export default useSocketInitializer;
