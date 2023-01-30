import { useEffect } from 'react';

export const useMountEffect = (callback: () => void): void => {
  useEffect(() => {
    callback();
  }, [callback]);
};
