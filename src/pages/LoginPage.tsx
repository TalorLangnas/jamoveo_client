// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    
    if (token && userRole === "admin") {
      navigate("/admin");  // Redirect to admin page if logged in as admin
    } else if (token && userRole === "player") {
      navigate("/waiting");  // Redirect to waiting page if logged in as player
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateLoginForm(username, password);
    if (!isValid) {
      setFormError("Please enter both username and password.");
      return;
    }

    try {
      const { role } = await login(username, password);  // Call login function from useAuth

      if (role === "admin") {
        navigate("/admin");  // Navigate to Admin page
      } else if (role === "player") {
        navigate("/waiting");  // Navigate to Waiting page
      }
    } catch (err) {
      setFormError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {error && <div className="error">{error}</div>}
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
        <Button type="submit" label="Log In" />
      </form>
    </div>
  );
};

export default LoginPage;
