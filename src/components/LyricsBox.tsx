import React from 'react';

// Extend HTML attributes to allow passing children and className
export interface LyricsBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  // Optional prop: if provided, renders the lyrics from the array
  lines?: { lyrics: string; chords?: string }[][];
  // children can be provided as an alternative to lines
  children?: React.ReactNode;
}

const LyricsBox: React.FC<LyricsBoxProps> = ({ lines, children, ...rest }) => {
  if (children) {
    return (
      <div className="lyrics-box px-4 py-2" {...rest}>
        {children}
      </div>
    );
  }

  // Render lyrics from the lines prop if children are not provided
  const lyricLines = lines?.map(line =>
    line.map(segment => segment.lyrics).join(' ')
  );
  return (
    <div className="lyrics-box px-4 py-2" {...rest}>
      {lyricLines?.map((text, idx) => (
        <p key={idx} className="text-xl md:text-2xl text-black leading-relaxed mb-2">
          {text}
        </p>
      ))}
    </div>
  );
};

export default LyricsBox;
