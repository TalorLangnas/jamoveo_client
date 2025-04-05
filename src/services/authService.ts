import axios from "axios";

const API_URL = "http://localhost:5000";  // Update with your actual server URL

export const signupUser = async (username: string, password: string, instrument: string, role: "player" | "admin" = "player" ) => {
  if (role === "player") {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, { username, password, instrument });
      return response.data; // Assuming the API returns a response with data
    } catch (error) {
      throw new Error("Signup failed");
    }
  } else {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup/admin`, { username, password, instrument });
      return response.data; // Assuming the API returns a response with data
    } catch (error) {
      throw new Error("Signup failed");
    }
  }
};
