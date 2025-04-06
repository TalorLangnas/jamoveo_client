// src/services/sessionService.ts

import axios from "axios";

const API_URL = "http://localhost:5000";  // Replace with your actual backend URL

// Function to join a session
export const joinSessionAPI = async (sessionUrl: string, token: string) => {
  try {
    const reqBody = { sessionUrl };  
    const reqHeader = { Authorization: `Bearer ${token}` };  
    
    // Send request to the server (use sessionUrl directly)
    const response = await axios.post(
      sessionUrl + "/join",  
      reqBody,  
      {
        headers: reqHeader,  
      }
    );

    return response;  
  } catch (error) {
    throw new Error("Error occurred while joining the session.");
  }
};

// Function to disconnect the user from the session
export const logoutSessionAPI = async (sessionId: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/session/${sessionId}/disconnect`,
      { sessionId },  // Body with session ID
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Send JWT token in Authorization header
        },
      }
    );
    console.log("Response from logoutSessionAPI:", response);  // Debugging log
    return response;  // Return the response to be handled in the hook
  } catch (error) {
    throw new Error("Error occurred while disconnecting from the session.");
  }
};