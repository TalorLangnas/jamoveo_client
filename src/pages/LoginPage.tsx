// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import useAuth from "../hooks/useAuth";  
import useAdminSession from "../hooks/useAdminSession";  
import InputField from "../components/InputField";  
import Button from "../components/Button";  
import { validateLoginForm } from "../utils/validation";  
import usePlayerSession from "../hooks/usePlayerSession"; 
import "../assets/styles/components/LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { error, login } = useAuth();  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const { joinSession } = usePlayerSession();  
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
        navigate("/admin");
      } else if (role === "player") {
        const token = localStorage.getItem("token");
        await joinSession(token);
        navigate("/player");
      }
    } catch (err: any) {
      localStorage.clear();
      setFormError("An error occurred during login.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="top-section">
        <h2>Login</h2>
      </div>
      <div className="bottom-section">
        <div className="login-card">
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
      </div>
    </div>
  );
};

export default LoginPage;
