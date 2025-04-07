import React from 'react';

// Extend the props to include children and optionally className
export interface GeneralBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GeneralBox: React.FC<GeneralBoxProps> = ({ children, className, ...rest }) => {
  return (
    <div className={`general-box p-4 bg-gray-900 rounded ${className || ""}`} {...rest}>
      {children}
    </div>
  );
};

export default GeneralBox;
