import React from 'react';

export interface ChordsBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  // Optional prop if you want to use the component in its original mode.
  lines?: { lyrics: string; chords?: string }[][];
  // Allow children to be passed.
  children?: React.ReactNode;
}

const ChordsBox: React.FC<ChordsBoxProps> = ({ lines, children, ...rest }) => {
  // If children exist, render them.
  if (children) {
    return (
      <div className="chords-box px-4 py-2" {...rest}>
        {children}
      </div>
    );
  }
  // Otherwise, render the chords from the lines prop.
  return (
    <div className="chords-box px-4 py-2" {...rest}>
      {lines?.map((line, lineIndex) => (
        <table key={lineIndex} className="mb-4">
          <tbody>
            <tr className="chord-line">
              {line.map((segment, idx) => (
                <td key={idx} className="text-blue-600 font-semibold text-lg text-left align-bottom">
                  {segment.chords ? segment.chords : ''}
                </td>
              ))}
            </tr>
            <tr className="lyric-line">
              {line.map((segment, idx) => (
                <td key={idx} className="text-black text-2xl text-left align-top">
                  {segment.lyrics}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default ChordsBox;
