// src/services/authService.ts

import axios from "axios";
import { User } from "../models/User";  // Import the User interface
const API_URL = "http://localhost:5000";  // Update with your actual backend URL

// Function for user login
export const loginUser = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
    // Return token and role if login is successful
    console.log("Login response:", response.data);  // Debugging log
    const  { token, role, userId, instrument } = response.data;

    // Construct the User object (using the input username if no username is returned)
    const user: User = {
      username: username, // Alternatively, use response.data.username if available
      token: token,
      instrument: instrument,
      role: role,
      userId: userId,
      sessionId: "0",  // Default sessionId, can be updated later
    };

    // return { token, role, userId, instrument };  // Return token, role, and userId for further use
    return user;
  } catch (error) {
    throw new Error("Invalid username or password"); // Handle invalid credentials error
  }
};

// Function for user signup
export const signupUser = async (username: string, password: string, instrument: string, role: "player" | "admin" = "player") => {
  if (role === "player") {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, { username, password, instrument });
      return response.data;  // Return the response data if signup is successful
    } catch (error) {
      throw new Error("Signup failed"); // Handle signup failure
    }
  } else {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup/admin`, { username, password, instrument });
      return response.data;  // Return the response data for admin signup
    } catch (error) {
      throw new Error("Signup failed");
    }
  }
};
