// src/models/User.ts

export interface User {
    username: string;
    token: string;
    instrument: string;
    role: "player" | "admin";
    // On the client, we can represent the sessionId as a string (for ObjectId) or a number.
    sessionId: string | number;
    userId: string;  // Optional userId property
  }
  
  export default User;
  