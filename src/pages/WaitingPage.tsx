// src/pages/WaitingPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePlayerSession from "../hooks/usePlayerSession";  // Custom hook for player session
import Button from "../components/Button";  // Reusable button component


const WaitingPage = () => {
  const [sessionUrl, setSessionUrl] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const { error, joinSession } = usePlayerSession();  // Custom hook to join session
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!sessionUrl.trim()) {
      setFormError("Please enter a valid session URL.");
      return;
    }

    try {
      const sessionData = await joinSession(sessionUrl, localStorage.getItem("token")!);
      navigate("/player", { state: { session: sessionData } });
    } catch (err) {
      setFormError("Failed to join the session. Please try again.");
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
