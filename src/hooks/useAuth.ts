import { useState } from "react";
import { signupUser, loginUser } from "../services/authService";

// Custom hook for authentication
const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const signup = async (
    username: string,
    password: string,
    instrument: string,
    role: "player" | "admin" = "player"
  ) => {
    try {
      await signupUser(username, password, instrument, role);
      setError(null);
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const user = await loginUser(username, password);
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("instrument", user.instrument);
      localStorage.setItem("sessionId", "0");
      return user;
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
      throw new Error("Invalid credentials");
    }
  };

  return { error, signup, login };
};

export default useAuth;
