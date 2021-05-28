import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import useEventListener from '../hooks/useEventListener';
import LineNumbers from './LineNumbers';

const keyPressed = new Map<string, boolean>();

interface EditorProps {
  onSave?: (content: string) => any;
}
const Editor: React.FC<EditorProps> = ({
  onSave
}) => {
  const editorTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, setTextValue] = useState<string>(''); 

  useEffect(() => {
    keyPressed.set('control', false);
    keyPressed.set('s', false);
  }, []);

  const handleChange = (e: ChangeEvent) => {
    setTextValue(editorTextAreaRef.current?.value ?? '');
  }

  const handleKeyDown = (e: Event) => {
    const event = e as KeyboardEvent;
    const key = event.key.toLowerCase();
    if (keyPressed.has(key)) {
      keyPressed.set(key, true);
    }
    if (keyPressed.get('control') && keyPressed.get('s')) {
      e.preventDefault();
      console.log('save doc');
      if (onSave !== undefined)
        onSave(editorTextAreaRef.current?.value ?? '');
    }
  }

  const handleKeyUp = (e: Event) => {
    const event = e as KeyboardEvent;
    const key = event.key.toLowerCase();
    if (keyPressed.has(key)) {
      keyPressed.set(key, false);
    }
  }
  
  useEventListener(editorTextAreaRef, 'keydown', handleKeyDown);
  useEventListener(editorTextAreaRef, 'keyup', handleKeyUp);

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
