import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";  // Ensure correct path for SignupPage import
import './assets/styles/components/App.css'; // Importing the CSS for styling

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
