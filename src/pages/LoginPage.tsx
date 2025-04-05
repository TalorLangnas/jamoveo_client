// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // For routing
import useAuth from "../hooks/useAuth";  // Custom hook for auth logic
import InputField from "../components/InputField";  // Reusable input component
import Button from "../components/Button";  // Reusable button component
import { validateLoginForm } from "../utils/validation";  // Import new validation function
import "../assets/styles/components/App.css";  // Importing the CSS for styling

const LoginPage = () => {
  const navigate = useNavigate();
  const { error, login } = useAuth();  // Using the custom hook for login logic
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);  // For displaying form errors

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form inputs using the new login validation function
    const isValid = validateLoginForm(username, password);
    if (!isValid) {
      setFormError("Please enter both username and password.");
      return;
    }

    try {
      const { role } = await login(username, password);  // Call login function from useAuth
        console.log(role);  // Log the role for debugging
      // Navigate based on the role returned from backend
      if (role === "admin") {
        navigate("/admin");  // Navigate to Admin page
      } else if (role === "player") {
        navigate("/waiting");  // Navigate to Waiting page
      }
    } catch (err) {
      setFormError("Invalid username or password.");
    }
  };

  // Navigate to Signup Page
  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && formError && <div className="error">{formError}</div>}
      
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
        <Button type="submit" label="Log In" />
      </form>
      
      {/* Sign Up Button */}
      <div className="signup-button">
        <Button type="button" label="Go to Signup" onClick={goToSignup} />
      </div>
    </div>
  );
};

export default LoginPage;
