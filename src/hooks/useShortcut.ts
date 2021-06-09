import React, { useEffect, useRef } from "react";
import useEventListener from "./useEventListener";

const pressedKeys = new Map<string, boolean>();

export const useShortcut = (elementRef: React.RefObject<any>, keys: Array<string>, callback: () => void)  => {

  const savedCallback = useRef<() => void>();
  useEffect(() => {
    for(const key of keys) {
      pressedKeys.set(key, false);
    }
  }, []);

  if (savedCallback.current !== callback) {
    savedCallback.current = callback;
  }

  const handleKeyDown = (e: Event) => {
    const event = e as KeyboardEvent;
    const key = event.key.toLowerCase();
    if (pressedKeys.has(key)) {
      pressedKeys.set(key, true);
    }
    if (keys.every(key => pressedKeys.get(key))) {
      if(!!savedCallback.current) {
        savedCallback.current();
      }
    }
  }

  const handleKeyUp = (e: Event) => {
    const event = e as KeyboardEvent;
    const key = event.key.toLowerCase();
    if (pressedKeys.has(key)) {
      pressedKeys.set(key, false);
    }
  }

  useEventListener(elementRef, 'keydown', handleKeyDown);
  useEventListener(elementRef, 'keyup', handleKeyUp);
}
