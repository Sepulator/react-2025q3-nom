import { useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

export const useClickOutside = (handler: Handler) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.closest('.card') ||
        target.closest('.flyout') ||
        !target.closest('#root') ||
        target.closest('.search') ||
        target.closest('.theme-toggle') ||
        target.closest('.card-detail')
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
};
