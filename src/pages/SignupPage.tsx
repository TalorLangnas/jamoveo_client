// src/pages/SignupPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // For routing
import useAuth from "../hooks/useAuth";  // Custom hook for auth logic
import InputField from "../components/InputField";  // Reusable input component
import Button from "../components/Button";  // Reusable button component
import { validateForm } from "../utils/validation";  // Form validation utility
import "../assets/styles/components/App.css";  // Importing the CSS for styling

const SignupPage = () => {
  const navigate = useNavigate();  // Initialize useNavigate
  const { error, signup } = useAuth();  // Using the custom hook for auth logic
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [role, setRole] = useState<"player" | "admin">("player");  // Default to 'player'
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form inputs
    const isValid = validateForm(username, password, instrument);
    if (!isValid) {
      setFormError("Please fill in all fields correctly.");
      return;
    }

    try {
      await signup(username, password, instrument, role);  // Call the signup function from useAuth hook
      navigate("/login");  // Redirect to login page after successful signup
    } catch (err) {
      setFormError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      {formError && <div className="error">{formError}</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="text"
          label="Instrument"
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        />

        {/* Role Selection for Admin or Player */}
        <div className="role-selection">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value as "player" | "admin")}>
            <option value="player">Player</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button type="submit" label="Sign Up" />
      </form>
    </div>
  );
};

export default SignupPage;
