import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WaitingPage from "./pages/WaitingPage";
import SignupPage from "./pages/SignupPage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminResultsPage from "./pages/AdminResultsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/admin/results" element={<AdminResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
