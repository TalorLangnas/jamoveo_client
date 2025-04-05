// src/pages/AdminMainPage.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // For routing
import useAdminSearch from "../hooks/useAdminSearch";  // Custom hook for admin song search logic
import InputField from "../components/InputField";  // Reusable input component
import Button from "../components/Button";  // Reusable button component
import "../assets/styles/components/App.css";  // Importing the CSS for styling

const AdminMainPage = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { error: searchError, sessionUrl, createSession, searchSong } = useAdminSearch();  // Use the custom hook

  // Use effect to create a session when the admin navigates to the page
  useEffect(() => {
    createSession();  // Call the function when the component is mounted
  }, []);  // Empty dependency array ensures this runs only once when the component is mounted

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a valid search query.");
      return;
    }

    try {
      await searchSong(query);  // Call the search function from the hook
      navigate("/admin/results");  // Redirect to the results page (not yet implemented)
    } catch (err) {
      setError("Error occurred while searching for the song. Please try again.");
    }
  };

  const handleCopyClick = () => {
    if (sessionUrl) {
      // Create a temporary input element to copy the URL
      const tempInput = document.createElement("input");
      tempInput.value = sessionUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);  // Clean up
      alert("Session URL copied to clipboard!");
    }
  };

  return (
    <div className="admin-main-page">
      <h2>Search any song...</h2>
      {error && <div className="error">{error}</div>}
      {searchError && <div className="error">{searchError}</div>}  {/* Display session creation errors */}
      
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Enter song name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" label="Search" />
      </form>

      {/* Display session URL if created successfully */}
      {sessionUrl && (
        <div>
          <p>Session created successfully! Here is your session URL:</p>
          <div className="session-url">
            <span>{sessionUrl}</span>
            <Button type="button" label="Copy URL" onClick={handleCopyClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMainPage;
