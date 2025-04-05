import React, { useState } from "react";

const WaitingPage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    // Placeholder for the logic that will be implemented later
    console.log("Submitted: ", inputValue);
  };

  return (
    <div className="waiting-page">
      <h2>Waiting Room</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter something..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WaitingPage;
