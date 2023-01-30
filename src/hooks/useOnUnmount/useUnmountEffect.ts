import { useEffect } from 'react';

export const useUnmountEffect = (callback: () => void): void => {
  useEffect(
    () => () => {
      callback();
    },
    [],
  );
};
