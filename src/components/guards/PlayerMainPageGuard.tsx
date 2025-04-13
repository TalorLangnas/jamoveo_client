import React from "react";
import { Navigate } from "react-router-dom";

interface PlayerMainPageGuardProps {
  children: React.ReactNode;
}

const PlayerMainPageGuard: React.FC<PlayerMainPageGuardProps> = ({
  children,
}) => {
  const role = localStorage.getItem("role");
  const sessionId = localStorage.getItem("sessionId");

  if (role !== "player" || sessionId === null || sessionId === "0") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PlayerMainPageGuard;
