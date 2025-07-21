import { useState, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  const clearValue = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return [storedValue, setValue, clearValue];
}
