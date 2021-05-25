import React, { useEffect, useRef } from 'react';
import useEventListener from '../hooks/useEventListener';

const keyPressed = new Map<string, boolean>();
keyPressed.set('control', false);
keyPressed.set('s', false);

interface EditorProps {
  onSave?: (content: string) => any;
}
const Editor: React.FC<EditorProps> = ({
  onSave
}) => {
  const editorTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    keyPressed.set('control', false);
    keyPressed.set('s', false);
  }, []);

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
    <textarea
      ref={editorTextAreaRef}
      className="editor"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      autoFocus
    />
  );
}

export default Editor;
