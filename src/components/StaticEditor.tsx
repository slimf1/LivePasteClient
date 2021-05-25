import React from 'react';
import LineNumbers from './LineNumbers';

interface StaticEditorProps {
  content?: string;
  innerRef?: React.RefObject<any>;
  isError?: boolean;
  lineNumbers?: boolean;
}
const StaticEditor: React.FC<StaticEditorProps> = ({
  content,
  innerRef,
  isError,
  lineNumbers
}) => {
  return (
    <pre>
      <LineNumbers lineNumbers={content?.split('\n').length ?? 1} />
      <code 
        ref={innerRef} 
        className={`editor ${isError ? 'error-message' : ''}`}
      >
        {content}
      </code>
    </pre>
  );
}

export default StaticEditor;
