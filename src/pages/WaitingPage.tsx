// src/pages/WaitingPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePlayerSession from "../hooks/usePlayerSession";  
import Button from "../components/Button";  // Reusable button component


const WaitingPage = () => {
  const [sessionUrl, setSessionUrl] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);  // For displaying errors
  const { joinSession } = usePlayerSession();  // Custom hook to join session
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!sessionUrl.trim()) {
      setFormError("Please enter a valid session URL.");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);  // Debugging log
    if (!token) {
      setFormError("Token is missing. Please login again.");
      return;
    }

    try {
      const sessionData = await joinSession(sessionUrl, token);
      const sessionId = sessionData;
      console.log("sessionData:", sessionData);  // Debugging log
      navigate("/player", { state: { session: sessionData } });
    } catch (err) {
      const errorMessage = (err as Error).message || "An error occurred while joining the session.";
      setFormError(errorMessage || "An error occurred while joining the session.");
      setError("test");  // Set error message for invalid token
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");  // Navigate to login page
  };

  return (
    <div className="waiting-page">
      <h2>Waiting Room</h2>
      {formError && <div className="error">{formError}</div>}
      {error && <div className="error">{error}</div>}

      <input
        type="text"
        value={sessionUrl}
        onChange={(e) => setSessionUrl(e.target.value)}
        placeholder="Enter session URL"
      />
      <Button type="button" label="Join Session" onClick={handleSubmit} />
      
      {/* Logout button */}
      <Button type="button" label="Logout" onClick={handleLogout} />
    </div>
  );
};

export default WaitingPage;
