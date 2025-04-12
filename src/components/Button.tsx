// src/components/Button.tsx

import React from "react";
import "../assets/styles/components/Button.css";


interface ButtonProps {
  type: "submit" | "button";
  label: string;
  onClick?: () => void; // Add onClick as an optional prop
}

const Button: React.FC<ButtonProps> = ({ type, label, onClick }) => {
  return (
    <button type={type} className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
