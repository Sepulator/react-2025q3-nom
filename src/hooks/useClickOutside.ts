import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent) => void;

export const useClickOutside = (handler: Handler) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !ref.current ||
        ref.current.contains(target) ||
        target.closest('.card') ||
        !target.closest('#root') ||
        target.closest('.search')
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [handler]);

  return ref;
};
