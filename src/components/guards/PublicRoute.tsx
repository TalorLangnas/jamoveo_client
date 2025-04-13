import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If token exists and role is set, redirect accordingly.
  if (token && role) {
    if (role === "admin") {
      return <Navigate to="/admin" />;
    } else if (role === "player") {
      return <Navigate to="/player" />;
    }
  }

  // No token: allow access to login/signup pages.
  return <>{children}</>;
};

export default PublicRoute;
