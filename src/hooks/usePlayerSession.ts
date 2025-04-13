import { joinSessionAPI } from "../services/sessionService";
import { connectSocket, joinSessionSocket } from "../services/socketService";

// Custom hook for managing player sessions
const usePlayerSession = () => {
  const joinSession = async (token: string | null) => {
    try {
      const response = await joinSessionAPI(token);
      if (response.status === 200) {
        localStorage.setItem("sessionId", response.data.session._id);
        connectSocket(); // Connect to the socket server
        joinSessionSocket(response.data.session._id, response.data.session._id); // Join the session using socket
        return response.data;
      } else {
        const serverError = response.data?.message || "???";
        throw new Error(serverError);
      }
    } catch (err) {
      throw err;
    }
  };

  return { joinSession };
};

export default usePlayerSession;
