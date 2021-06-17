import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import useEventListener from '../hooks/useEventListener';
import { useShortcut } from '../hooks/useShortcut';
import LineNumbers from './LineNumbers';

interface EditorProps {
  onSave?: (content: string) => void;
}
const Editor: React.FC<EditorProps> = ({
  onSave
}) => {
  const editorTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, setTextValue] = useState<string>(''); 

  const handleChange = () => {
    setTextValue(editorTextAreaRef.current?.value ?? '');
  }

  const handleKeyDown = () => {
    if (editorTextAreaRef.current !== null) {
      editorTextAreaRef.current.style.height = 'inherit';
      editorTextAreaRef.current.style.height = `${editorTextAreaRef.current.scrollHeight}px`; 
    }
  }

  useEventListener(editorTextAreaRef, 'keydown', handleKeyDown);
  
  useShortcut(editorTextAreaRef, ['control', 's'], evt => {
    evt.preventDefault();
    console.log('save doc');
    if (onSave !== undefined)
      onSave(editorTextAreaRef.current?.value ?? '');
  });

  return (
    <>
      <LineNumbers 
        lineNumbers={editorTextAreaRef.current?.value.split('\n').length ?? 1}
      />
      <textarea
        ref={editorTextAreaRef}
        onChange={handleChange}
        className="editor"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        autoFocus
      />
    </>
  );
}

export default Editor;
