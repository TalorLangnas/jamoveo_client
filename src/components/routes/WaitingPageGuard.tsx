import React from 'react';
import { Navigate } from 'react-router-dom';

interface WaitingPageGuardProps {
  children: React.ReactNode;
}

const WaitingPageGuard: React.FC<WaitingPageGuardProps> = ({ children }) => {
  // Retrieve the role and sessionId values from local storage.
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const sessionId = localStorage.getItem('sessionId');

  console.log('ProtectedRoute: token:', token); // Debugging log
  console.log('role:', role); // Debugging log
  console.log('sessionId:', sessionId); // Debugging log

  // If there is no token, the user is not logged in.
    if (!token || !role) {
      return <Navigate to="/login" />;
    }
    
  // Check if the user is a player and if the sessionId equals "0"
  if (role === 'player' && sessionId !== '0') {
    // Redirect to login or another route if the conditions are not met.
    return <Navigate to="/player" />;
  }

  // If both conditions are met, render the children (in this case, the WaitingPage).
  return <>{children}</>;
};

export default WaitingPageGuard;
