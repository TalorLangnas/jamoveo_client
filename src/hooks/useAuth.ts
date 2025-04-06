// src/hooks/useAuth.ts

import { useState } from "react";
import { signupUser, loginUser } from "../services/authService"; // API calls for signup and login

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);  // For storing errors during login and signup

  // Signup function
  const signup = async (username: string, password: string, instrument: string, role: "player" | "admin" = "player") => {
    try {
      await signupUser(username, password, instrument, role);  // Call the API to register the user
      setError(null);  // Reset error on success
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  // Login function
  const login = async (username: string, password: string) => {
    console.log("Login function called with:", username, password);  // Log the login attempt

    try {
      const { token, role } = await loginUser(username, password);  // Call the API to log in the user

      // Store the token in localStorage for future authenticated requests
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      return { token, role };  // Return token and role for navigation
    } catch (err) {
      // Handle errors from the backend (e.g., invalid username/password)
      console.error("Login error:", err);
      setError("Invalid username or password");
      throw new Error("Invalid credentials");
    }
  };

  return { error, signup, login };
};

export default useAuth;
