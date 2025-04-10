// // src/pages/PlayerMainPage.tsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { listenCustomEvent } from "../services/socketService"; // or socketIoService depending on your file

// const PlayerMainPage: React.FC = () => {
//   const navigate = useNavigate();
  
//   // This state variable is initially false. When a socket event is received, set it to true.
//   const [customEventReceived, setCustomEventReceived] = useState<boolean>(false);
//   // Optionally store any data from the event, such as session or song information.
//   const [eventData, setEventData] = useState<any>(null);

//   useEffect(() => {
//     // Set up the listener for the custom event.
//     listenCustomEvent((data) => {
//       console.log("Custom event received in component:", data);
//       setCustomEventReceived(true);
//       setEventData(data); // Save event data if needed
//     });

//     // Optional cleanup if your socket service exposes a way to remove listeners:
//     // return () => {
//     //   socket.off("custom_event");
//     // };
//   }, []);

//   useEffect(() => {
//     // When the custom event is received, navigate to the Live page.
//     if (customEventReceived) {
//       // You can pass the event data (if needed) via state to LivePage.
//       navigate("/live", { state: { eventData } });
//     }
//   }, [customEventReceived, eventData, navigate]);

//   return (
//     <div className="player-main-page">
//       <h2>Welcome to the Player Main Page</h2>
//       <h3>
//         {customEventReceived ? "Navigating to Live Page..." : "Waiting for admin to go live"}
//       </h3>
//       <p>You are now part of the session.</p>
//     </div>
//   );
// };

// export default PlayerMainPage;
// src/pages/PlayerMainPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listenSongEvent } from "../services/socketService"; // Adjust the path if necessary
import Song from "../models/Song";

const PlayerMainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the listener for the "start_song" event.
    listenSongEvent((data: { song: Song }) => {
      console.log("Song received from server:", data.song);
      // When the event is received, navigate to the Live Page with the song data.
      navigate("/live", { state: { song: data.song } });
    });

    // Optionally, you might add a cleanup to remove the listener on component unmount,
    // depending on how your socket service is set up.
    // return () => {
    //   socket.off("start_song");
    // };
  }, [navigate]);

  return (
    <div className="player-main-page">
      <h2>Welcome to the Player Main Page</h2>
      <h3>Waiting for the admin to start the song...</h3>
      <p>You are now part of the session.</p>
    </div>
  );
};

export default PlayerMainPage;
