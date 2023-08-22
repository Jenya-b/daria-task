import { useState, useEffect } from 'react';

export const useDebounce = (
  value: string[],
  delay = 1000
): { highlighted: string[]; deselected: string[] } => {
  const [oldArr, setOldArr] = useState<string[]>(value);
  const [debounced, setDebounced] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<string[]>([]);
  const [deselected, setDeselected] = useState<string[]>([]);

  useEffect(() => {
    setOldArr(debounced);
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  useEffect(() => {
    setDeselected(oldArr.filter((item) => !debounced.includes(item)));
    setHighlighted(debounced.filter((item) => !oldArr.includes(item)));
  }, [debounced]);

  return { highlighted, deselected };
};
