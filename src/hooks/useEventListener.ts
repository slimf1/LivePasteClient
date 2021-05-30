import { RefObject, useEffect, useRef } from 'react';

export default function useEventListener<T extends HTMLElement = HTMLDivElement>(
  el: RefObject<T>, eventType: keyof WindowEventMap, handler: (event: Event) => void
) {
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    const targetElement: T | Window = el?.current || window;
    if (!targetElement || !targetElement.addEventListener)
      return; 

    if (savedHandler.current !== handler)
      savedHandler.current = handler;

    const eventListener = (event: Event) => {
      if (!!savedHandler?.current)
        savedHandler.current(event);
    }

    targetElement.addEventListener(eventType, eventListener);
    return () => targetElement.removeEventListener(eventType, eventListener);
  }, [eventType, el, handler]);
}
