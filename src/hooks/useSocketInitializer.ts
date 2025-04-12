// src/hooks/useSocketInitializer.ts
import { useEffect } from "react";
import { connectSocket, joinSessionSocket } from "../services/socketService";

const useSocketInitializer = (sessionId: string, userId?: string) => {
    console.log("useSocketInitializer called with sessionId:", sessionId, "and userId:", userId); // Debugging log
  useEffect(() => {
    connectSocket(); // Reconnect to the server
    if (sessionId) {
      joinSessionSocket(sessionId, userId);
    }
  }, [sessionId, userId]);
};

export default useSocketInitializer;
