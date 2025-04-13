import React, { useState, useEffect } from "react";
import '../assets/styles/components/AutoScrollToggle.css';


interface AutoScrollToggleProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const AutoScrollToggle: React.FC<AutoScrollToggleProps> = ({ scrollContainerRef }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const speeds = [0.5, 1, 1.5, 2];
  const [speedIndex, setSpeedIndex] = useState<number>(1);
  const currentSpeed = speeds[speedIndex];

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isAutoScrolling && scrollContainerRef.current) {
      intervalId = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy(0, currentSpeed * 2.5);
        }
      }, 30);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoScrolling, currentSpeed, scrollContainerRef]);

  const toggleScroll = () => {
    setIsAutoScrolling(prev => !prev);
  };

  const increaseSpeed = () => {
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
