// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Check if the user is authenticated and has the right role
const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = localStorage.getItem("token");  // Check if token exists in localStorage
  const userRole = localStorage.getItem("role");  // Get user role from localStorage

  // If no token is found, the user is not logged in, so redirect to login
  if (!token) {
    console.log("No token found, redirecting to login."); // Debugging log
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in but tries to access login/signup, redirect based on role
  if (userRole === "admin") {
    // If logged in as admin, redirect to admin page
    return <Navigate to="/admin" replace />;
  } else if (userRole === "player") {
    // If logged in as player, redirect to waiting page
    return <Navigate to="/waiting" replace />;
  }

  // If the role is allowed, proceed with rendering the component
  if (allowedRoles.includes(userRole!)) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;  // Default fallback if not allowed
};

export default PrivateRoute;
