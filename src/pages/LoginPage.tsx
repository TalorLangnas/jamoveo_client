// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import useAuth from "../hooks/useAuth";  
import useAdminSession from "../hooks/useAdminSession";  
import InputField from "../components/InputField";  
import Button from "../components/Button";  
import { validateLoginForm } from "../utils/validation";  
import usePlayerSession from "../hooks/usePlayerSession"; 
import "../assets/styles/components/App.css";  

const LoginPage = () => {
  const navigate = useNavigate();
  const { error, login } = useAuth();  // Using the custom hook for login logic
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);  // For displaying form errors
  const { joinSession } = usePlayerSession();  // Custom hook to join session
  const { createSession } = useAdminSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateLoginForm(username, password);
    if (!isValid) {
      setFormError("Please enter both username and password.");
      return;
    }

    try {
      const { role } = await login(username, password);  
      if (role === "admin") {
        await createSession(); 
        navigate("/admin");  // Navigate to Admin page
      } else if (role === "player") {
        const token = localStorage.getItem("token");
        await joinSession(token);
        navigate("/player");  // Navigate to Waiting page
      }
    } catch (err: any) {
      localStorage.clear();
      setFormError(err.response.data.message);
      throw err;  // Propagate error to be handled by the component
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
        <Button type="submit" label="Log In"/>
      </form>
      {/* Add a Sign Up button for navigation */}
      <div className="signup-redirect">
        <p>Don't have an account?</p>
        <Button type="button" label="Sign Up" onClick={() => navigate("/signup")} />
      </div>
    </div>
  );
};

export default LoginPage;
