import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/components/Header.css";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="app-logo">
          <Link to="/">JaMoveo</Link>
        </h1>
        <nav className="header-nav">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
