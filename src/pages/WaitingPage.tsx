// src/pages/WaitingPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePlayerSession from "../hooks/usePlayerSession";  // Custom hook for player session
import Button from "../components/Button";  // Reusable button component

const WaitingPage = () => {
  const [sessionUrl, setSessionUrl] = useState("");
  const [formError, setFormError] = useState<string | null>(null);  // For displaying errors
  const { error, joinSession } = usePlayerSession();  // Custom hook to join session
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("test");
    if (!sessionUrl.trim()) {
      console.log("Session URL is empty.", sessionUrl);
      setFormError("Please enter a valid session URL.");
      return;
    }

    try {
      // Call the joinSession function to join the session
      const sessionData = await joinSession(sessionUrl, localStorage.getItem("token")!);
        
      // Navigate to PlayerMainPage if session is successfully joined
      navigate("/player", { state: { session: sessionData } });  // Passing session data as state
    } catch (err) {
      setFormError("Failed to join the session. Please try again.");
    }
  };

  return (
    <div className="waiting-page">
      <h2>Waiting Room</h2>
      {formError && <div className="error">{formError}</div>}
      {error && <div className="error">{error}</div>}  {/* Display session join errors */}

      <input
        type="text"
        value={sessionUrl}
        onChange={(e) => setSessionUrl(e.target.value)}
        placeholder="Enter session URL"
      />
      <Button type="button" label="Join Session" onClick={handleSubmit} />
    </div>
  );
};

export default WaitingPage;
