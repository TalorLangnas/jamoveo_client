// src/hooks/useSession.ts
import { useState } from "react";
import { logoutSessionAPI } from "../services/sessionService";  // Import service function for API call

const useSession = () => {
  const [error, setError] = useState<string | null>(null);  // For storing errors if any

  const logout = async () => {
    const token = localStorage.getItem("token");
    const sessionId = localStorage.getItem("sessionId");

    if (!token || !sessionId) {
      setError("No valid session or token found.");
      return;
    }

    try {
      // Call service function to disconnect the user from the session
      await logoutSessionAPI(sessionId, token);

      // If logout is successful, clear the local storage
      localStorage.clear();
      return true;  // Return success
    } catch (err) {
      setError("Error occurred while logging out. Please try again.");
      return false;  // Return failure
    }
  };

  return { error, logout };
};

export default useSession;
