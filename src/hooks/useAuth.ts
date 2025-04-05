import { useState } from "react";
import { signupUser } from "../services/authService"; // API call for signing up

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const signup = async (username: string, password: string, instrument: string, role: "player" | "admin" = "player") => {
    try {
      await signupUser(username, password, instrument, role);  // Call API to register the user
      setError(null); // Reset error on success
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return { error, signup };
};

export default useAuth;
