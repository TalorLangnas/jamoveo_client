// src/App.tsx

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminMainPage from "./pages/AdminMainPage";  // Admin Main Page
import AdminResultsPage from "./pages/AdminResultsPage";  // Admin Results Page
import LoginPage from "./pages/LoginPage";  // Login Page
import PlayerMainPage from "./pages/PlayerMainPage";  // Player Main Page
import SignupPage from "./pages/SignupPage";  // Signup Page
import WaitingPage from "./pages/WaitingPage";  // Waiting page
import PublicRoute from "./components/routes/PublicRoute";  
import ProtectedRoute from "./components/routes/ProtectedRoute";
import WaitingPageGuard from "./components/routes/WaitingPageGuard";
import PlayerMainPageGuard from "./components/routes/PlayerMainPageGuard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminMainPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes for player */}
        <Route
          path="/waiting"
          element={
            <WaitingPageGuard>
              <WaitingPage />
            </WaitingPageGuard>
          }
        />

        {/* Protected routes for player */}
        <Route
          path="/player"
          element={
            <PlayerMainPageGuard>
              <PlayerMainPage />
            </PlayerMainPageGuard>
          }
        />

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </Router>          
  );
};

export default App;