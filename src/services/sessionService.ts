import axios from "axios";

const API_URL = "https://my-express-app-9ynn.onrender.com";

// Session service for creating, joining, and disconnecting from sessions

export const createSessionAPI = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/session`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error occurred while creating session.");
  }
};

export const joinSessionAPI = async (token: string | null) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/session/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    if (error.response) {
      throw error;
    } else {
      throw error;
    }
  }
};

export const logoutSessionAPI = async (sessionId: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/session/${sessionId}/disconnect`,
      { sessionId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error occurred while disconnecting from the session.");
  }
};
