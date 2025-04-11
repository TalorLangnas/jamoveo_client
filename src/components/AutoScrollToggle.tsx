// src/components/AutoScrollToggle.tsx
import React, { useState, useEffect } from "react";
import '../assets/styles/components/AutoScrollToggle.css'; // Adjust the path as necessary

interface AutoScrollToggleProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const AutoScrollToggle: React.FC<AutoScrollToggleProps> = ({ scrollContainerRef }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);

  // Define four possible speeds: 0.5, 1, 1.5, and 2 (pixels per tick)
  const speeds = [0.5, 1, 1.5, 2];
  // Track the current speed index; default to index 1 (speed of 1)
  const [speedIndex, setSpeedIndex] = useState<number>(1);
  const currentSpeed = speeds[speedIndex];

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isAutoScrolling && scrollContainerRef.current) {
      // Set up the interval to scroll the container every 30ms
      intervalId = setInterval(() => {
        if (scrollContainerRef.current) {
          // Scroll down by currentSpeed * 2.5 pixels each tick
          scrollContainerRef.current.scrollBy(0, currentSpeed * 2.5);
        }
      }, 30);
    }

    // Cleanup the interval when auto scrolling stops or component unmounts.
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoScrolling, currentSpeed, scrollContainerRef]);

  const toggleScroll = () => {
    setIsAutoScrolling(prev => !prev);
  };

  const increaseSpeed = () => {
    // Cycle through the speeds array:
    setSpeedIndex(prevIndex => (prevIndex + 1) % speeds.length);
  };

  return (
    <div className="auto-scroll-controls">
        <button className="auto-scroll-button" onClick={toggleScroll}>
            {isAutoScrolling ? "Stop Scroll" : "Start Scroll"}
        </button>
        <button className="auto-scroll-button" onClick={increaseSpeed}>
            Speed: {currentSpeed}x
        </button>
    </div>
  );
};

export default AutoScrollToggle;
