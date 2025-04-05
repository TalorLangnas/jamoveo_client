// src/hooks/usePlayerSession.ts

import { useState } from "react";

import { joinSessionAPI } from "../services/sessionService";  // API call for joining a session

const usePlayerSession = () => {
  const [error, setError] = useState<string | null>(null);  // For storing errors

  const joinSession = async (sessionUrl: string, token: string) => {
    try {
      console.log("enter joinSession");  // Debugging log
      // Call the joinSessionAPI function to join the session
      const response = await joinSessionAPI(sessionUrl, token);
      console.log("Response from joinSessionAPI:", response);  // Debugging log
      if (response.status === 200) {
        // Successful login and session join
        return response.data;  // Return the response with the session and user info
      } else {
        setError("Failed to join the session. Please try again.");
        throw new Error("Failed to join session.");
      }
    } catch (err) {
      setError("Invalid or expired token");
      throw err;
    }
  };

  return { error, joinSession };
};

export default usePlayerSession;
