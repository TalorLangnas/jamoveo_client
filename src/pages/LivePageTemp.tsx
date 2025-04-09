import React, { useState, useEffect, useRef } from 'react';
import Title from "../components/Title";
import LyricsBox from "../components/LyricsBox";
import ChordsBox from "../components/ChordsBox";
import GeneralBox from "../components/GeneralBox";
import QuitBox from "../components/QuitBox";
import ScrollToggleButton from "../components/ScrollToggleButton";


interface Song {
  title: string;
  author: string;
  lines: { lyrics: string; chords?: string }[][];
}

interface LivePageProps {
  song: Song;
  userRole: 'admin' | 'singer' | 'player';
  onQuit: () => void;
}

const LivePage: React.FC<LivePageProps> = ({ song, userRole, onQuit }) => {
  // State to track whether auto-scrolling is active
  const [autoScroll, setAutoScroll] = useState(false);
  // Ref for the scrollable content container
  const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect for auto-scroll: starts an interval when autoScroll is true and clears it when false or on unmount
  useEffect(() => {
    let scrollInterval: NodeJS.Timer | undefined;
    if (autoScroll && scrollRef.current) {
      // Start a timer to scroll the content down at a steady, slow pace
      scrollInterval = setInterval(() => {
        // Scroll the container down by a few pixels on each tick
        if (scrollRef.current) {
          scrollRef.current.scrollBy(0, 1); // e.g., 1 pixel per tick for slow scrolling
        }
      }, 100); // adjust interval as needed for desired speed (100ms for a slow scroll)
    }
    // Cleanup: clear the interval when autoScroll is turned off or component unmounts
    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [autoScroll]);

  // Helper function to build a lyrics line (and matching chords line) from a segments array
  const buildLineText = (segments: { lyrics: string; chords?: string }[]) => {
    let lyricsLine = "";
    let chordsLine = "";
    segments.forEach((segment, index) => {
      const { lyrics, chords } = segment;
      // Position where this segment's lyrics will start in the full line
      const startPos = lyricsLine.length;
      // If there is a chord for this segment, add it at the current position in the chords line
      if (chords) {
        // Pad the chords line with spaces up to the current start position
        chordsLine = chordsLine.padEnd(startPos, " ");
        // Add the chord text at this position
        chordsLine += chords;
      }
      // Add the lyrics text for this segment to the lyrics line
      lyricsLine += lyrics;
      // If this segment is not the last in the line, add a space after it in the lyrics line
      if (index < segments.length - 1) {
        lyricsLine += " ";
      }
      // After adding the lyrics (and potential trailing space), pad the chords line to match the new length
      chordsLine = chordsLine.padEnd(lyricsLine.length, " ");
    });
    return { lyricsLine, chordsLine };
  };

  return (
    // Container with high-contrast background and text, taking full screen height
    <div className="h-screen bg-black text-white relative">
      {/* Scrollable content area (title and song lines) */}
      <div ref={scrollRef} className="h-full overflow-y-auto p-4">
        {/* Song title and author */}
        <Title title={song.title} author={song.author} />
        {/* Main content box for lyrics (and chords, if applicable) */}
        <GeneralBox className="mt-4">
          {song.lines.map((lineSegments, lineIndex) => {
            // Build the line text (for chords and lyrics) from segments
            const { lyricsLine, chordsLine } = buildLineText(lineSegments);
            return (
              <div key={lineIndex} className="mb-4"> 
                {/* If user is not a singer, show chords line above lyrics */}
                {userRole !== 'singer' && (
                  <ChordsBox>
                    <pre className="font-mono whitespace-pre text-2xl">
                      {chordsLine}
                    </pre>
                  </ChordsBox>
                )}
                {/* Always show lyrics line */}
                <LyricsBox>
                  <pre className="font-mono whitespace-pre text-2xl">
                    {lyricsLine}
                  </pre>
                </LyricsBox>
              </div>
            );
          })}
        </GeneralBox>
      </div>

      {/* Admin-only controls */}
      {userRole === 'admin' && (
        <>
          {/* Floating scroll toggle button (bottom-right) for starting/stopping auto-scroll */}
          <div className="fixed bottom-4 right-4">
            <ScrollToggleButton 
              isScrolling={autoScroll} 
              onToggle={() => setAutoScroll(prev => !prev)} 
            />
          </div>
          {/* Floating quit button (top-right) to end the session */}
          <div className="fixed top-4 right-4">
            <QuitBox isAdmin={true} onQuit={onQuit} />
          </div>
        </>
      )}
    </div>
  );
};

export default LivePage;
