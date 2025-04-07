import React from 'react';

export interface ScrollToggleButtonProps {
  isScrolling: boolean;
  onToggle: (isScrolling: boolean) => void;
}

const ScrollToggleButton: React.FC<ScrollToggleButtonProps> = ({ isScrolling, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(!isScrolling)}
      className="fixed bottom-4 right-4 bg-gray-800 text-white text-lg font-medium px-5 py-3 rounded-full shadow-lg opacity-80 hover:opacity-100"
    >
      {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
    </button>
  );
};

export default ScrollToggleButton;
