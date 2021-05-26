import React from 'react';

interface LineNumbersProps {
  lineNumbers: number;
}
const LineNumbers: React.FC<LineNumbersProps> = ({
  lineNumbers
}) => {
  const elements: JSX.Element[] = [];
  for(let i = 0; i < lineNumbers; ++i) {
    elements.push(<span key={i}>{i + 1}<br /></span>);
  }
  return (
    <div className="line-numbers">
      {elements}
    </div>
  );
}

export default LineNumbers;
