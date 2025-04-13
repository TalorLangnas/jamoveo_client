import React from "react";
import "../assets/styles/components/DotsLoader.css";

const DotsLoader: React.FC = () => {
  return (
    <div className="dots-loader">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default DotsLoader;
