import React from 'react';

// Title component displays the song title and author
export interface TitleProps {
  title: string;
  author: string;
}

const Title: React.FC<TitleProps> = ({ title, author }) => {
  return (
    <div className="title text-center my-6">
      {/* Song title in a large, bold font */}
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      {/* Song author in a slightly smaller, italic font */}
      <h2 className="text-2xl italic text-gray-700">{author}</h2>
    </div>
  );
};

export default Title;
