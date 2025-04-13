import { useState } from "react";
import { logoutSessionAPI } from "../services/sessionService";

// Custom hook for managing general User session
const useSession = () => {
  const [error, setError] = useState<string | null>(null); 

  const logout = async () => {
    const token = localStorage.getItem("token");
    const sessionId = localStorage.getItem("sessionId");
    if (!token || !sessionId) {
      setError("No valid session or token found.");
      return;
    }

    try {
      await logoutSessionAPI(sessionId, token);
      localStorage.clear();
      return true;
    } catch (err) {
      setError("Error occurred while logging out. Please try again.");
      return false;
    }
  };

  return { error, logout };
};

export default useSession;
