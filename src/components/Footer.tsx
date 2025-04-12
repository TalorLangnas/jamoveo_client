import React from "react";
import "../assets/styles/components/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      <div className="footer-links">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
