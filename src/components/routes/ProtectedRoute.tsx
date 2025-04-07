import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const sessionId = localStorage.getItem('sessionId');

  // If there is no token, the user is not logged in.
  if (!token || !role) {
    return <Navigate to="/login" />;
  }

  // If the user's role is not allowed, redirect them to the appropriate page.
  if (!allowedRoles.includes(role)) {
    if (role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (role === 'player' && sessionId === '0') {
      return <Navigate to="/waiting" />;
    } else if (role === 'player' && sessionId !== '0') {
      return <Navigate to="/player" />; // Redirect to game page if sessionId is not '0'
    } else {
      return <Navigate to="/login" />;
    }
  }

  // Authorized: render the protected component.
  return <>{children}</>;
};

export default ProtectedRoute;
