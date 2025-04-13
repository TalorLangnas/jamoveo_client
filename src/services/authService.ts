import axios from "axios";
import { User } from "../models/User";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Authentication service for user login and signup

export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });
    const { token, role, userId, instrument } = response.data;

    const user: User = {
      username: username,
      token: token,
      instrument: instrument,
      role: role,
      userId: userId,
      sessionId: "0", // Default sessionId
    };

    return user;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};

export const signupUser = async (
  username: string,
  password: string,
  instrument: string,
  role: "player" | "admin" = "player"
) => {
  if (role === "player") {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        username,
        password,
        instrument,
      });
      return response.data;
    } catch (error) {
      throw new Error("Signup failed"); // Handle signup failure
    }
  } else {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup/admin`, {
        username,
        password,
        instrument,
      });
      return response.data;
    } catch (error) {
      throw new Error("Signup failed");
    }
  }
};
