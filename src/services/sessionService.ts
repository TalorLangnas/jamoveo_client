// src/services/sessionService.ts

import axios from "axios";

const API_URL = "http://localhost:5000";  // Replace with your actual backend URL

// Function to join a session
export const joinSessionAPI = async (sessionUrl: string, token: string) => {
  try {
    console.log("sessionUrl", sessionUrl);  // Debugging log
    const reqBody = { sessionUrl };  // Request body with session URL
    console.log("reqBody", reqBody);  // Debugging log
    const reqHeader = { Authorization: `Bearer ${token}` };  // Request header with JWT token
    console.log("reqHeader", reqHeader);  // Debugging log
    
    // Send request to the server (use sessionUrl directly)
    const response = await axios.post(
      sessionUrl + "/join",  // Corrected: append only "/join" to the session URL
      reqBody,  // Body with session URL
      {
        headers: reqHeader,  // Send the JWT token in the Authorization header
      }
    );
    console.log("Response from joinSessionAPI:", response);  // Debugging log
    return response;  // Return the full response to be handled in the component
  } catch (error) {
    console.error("Error during session join:", error);  // Log the error for debugging
    throw new Error("Error occurred while joining the session.");
  }
};
