export interface User {
  username: string;
  token: string;
  instrument: string;
  role: "player" | "admin";
  sessionId: string | number;
  userId: string;
}

export default User;
