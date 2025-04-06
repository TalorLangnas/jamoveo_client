// src/components/PrivateRoute.tsx

import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

// Check if the user is authenticated and has the right role
const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If the user is not logged in or the role does not match, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the user role is not allowed, redirect to an error or a waiting page
  if (!allowedRoles.includes(userRole!)) {
    return <Navigate to="/waiting" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
