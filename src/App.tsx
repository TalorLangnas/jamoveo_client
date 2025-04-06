// src/App.tsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminMainPage from "./pages/AdminMainPage";  // Admin Main Page
import AdminResultsPage from "./pages/AdminResultsPage";  // Admin Results Page
import LoginPage from "./pages/LoginPage";  // Login Page
import PlayerMainPage from "./pages/PlayerMainPage";  // Player Main Page
import SignupPage from "./pages/SignupPage";  // Signup Page
import WaitingPage from "./pages/WaitingPage";  // Waiting page
import PrivateRoute from "./components/PrivateRoute";  // PrivateRoute for guarding routes

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/admin/results" element={<AdminResultsPage />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["player", "admin"]} />}>
          <Route path="/waiting" element={<WaitingPage />} />
        </Route>

        {/* Player's private route */}
        <Route element={<PrivateRoute allowedRoles={["player"]} />}>
          <Route path="/player" element={<PlayerMainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
