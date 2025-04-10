// src/hooks/usePlayerSession.ts

import { useState } from "react";

import { joinSessionAPI } from "../services/sessionService";  // API call for joining a session
import { connectSocket, joinSessionSocket } from "../services/socketService";  // Socket connection

const usePlayerSession = () => {
  // const [error, setError] = useState<string | null>(null);  // For storing errors

  const joinSession = async (sessionUrl: string, token: string) => {
    try {
      console.log("enter joinSession");  // Debugging log
      // Call the joinSessionAPI function to join the session
      const response = await joinSessionAPI(sessionUrl, token);
      console.log("Response from joinSessionAPI:", response);  // Debugging log
      if (response.status === 200) {
        localStorage.setItem("sessionId", response.data.session._id);
        connectSocket();  // Connect to the socket server
        joinSessionSocket(response.data.session._id, response.data.session._id);  // Join the session using socket
        return response.data;  // Return the response with the session and user info
      } else {
        const serverError = response.data?.message || "???";
        // setError(serverError);
        throw new Error(serverError);
      }
    } catch (err) {
      // setError("Invalid or expired token");
      throw err;
    }
  };

  // const listenEvent = () => {
  //   listenCustomEvent();  // Listen for custom events from the server
  //   setCustomEventReceived(true);
  // }

  return { joinSession };
};

export default usePlayerSession;
