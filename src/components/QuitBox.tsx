import React from 'react';

// QuitBox component displays a quit button, visible only to admin users.
export interface QuitBoxProps {
  isAdmin: boolean;
  onQuit?: () => void; // optional callback for when quit is triggered
}

const QuitBox: React.FC<QuitBoxProps> = ({ isAdmin, onQuit }) => {
  if (!isAdmin) {
    // If user is not an admin, do not render the quit button
    return null;
  }
  return (
    <div className="quit-box text-right p-4">
      {/* Only admins see this quit button */}
      <button
        onClick={onQuit}
        className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 shadow"
      >
        Quit
      </button>
    </div>
  );
};

export default QuitBox;
