import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminMainPage from "./pages/AdminMainPage";
import LoginPage from "./pages/LoginPage";
import PlayerMainPage from "./pages/PlayerMainPage";
import SignupPage from "./pages/SignupPage";
import PublicRoute from "./components/guards/PublicRoute";
import ProtectedRoute from "./components/guards/ProtectedRoute";
import PlayerMainPageGuard from "./components/guards/PlayerMainPageGuard";
import LivePage from "./pages/LivePage";
import MainLayout from "./components/MainLayout";

const App = () => {
  return (
    <Router>
      <MainLayout>
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
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminMainPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/player"
            element={
              <PlayerMainPageGuard>
                <PlayerMainPage />
              </PlayerMainPageGuard>
            }
          />
          <Route
            path="/live"
            element={
              <ProtectedRoute allowedRoles={["admin", "player"]}>
                <LivePage />
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
