import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminMainPage from "./pages/AdminMainPage";  // Admin Main Page
import AdminResultsPage from "./pages/AdminResultsPage";  // Admin Results Page
import LoginPage from "./pages/LoginPage";  // Login Page
import PlayerMainPage from "./pages/PlayerMainPage";  // Player Main Page
import SignupPage from "./pages/SignupPage";  // Signup Page
import WaitingPage from "./pages/WaitingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/admin/results" element={<AdminResultsPage />} />
        <Route path="/player" element={<PlayerMainPage />} />  {/* Player main page */}
        <Route path="/signup" element={<SignupPage />} />  {/* Signup page */}
        <Route path="/waiting" element={<WaitingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
