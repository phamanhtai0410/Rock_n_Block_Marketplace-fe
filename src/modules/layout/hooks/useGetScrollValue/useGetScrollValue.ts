import { useCallback, useEffect, useState } from 'react';

export const useGetScrollValue = (): [number] => {
  const [scrollValue, setScrollValue] = useState(0);

  const handleSetScrollValue = useCallback((event: Event) => {
    const { scrollTop } = (event.target as Document).documentElement;

    setScrollValue(scrollTop);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleSetScrollValue);
    return () => {
      document.removeEventListener('scroll', handleSetScrollValue);
    };
  }, [handleSetScrollValue]);

  return [scrollValue];
};
