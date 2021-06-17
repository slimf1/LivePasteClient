import React, { useEffect, useRef } from "react";
import useEventListener from "./useEventListener";

const pressedKeys = new Map<string, boolean>();

export const useShortcut = (elementRef: React.RefObject<any>, keys: Array<string>, callback: (e: KeyboardEvent) => void)  => {
  const savedCallback = useRef<(e: KeyboardEvent) => void>();

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
    console.log(pressedKeys);
    if (keys.every(key => pressedKeys.get(key))) {
      if(!!savedCallback.current) {
        savedCallback.current(event);
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
