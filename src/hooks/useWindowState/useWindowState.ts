/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { v4 as uuidv4 } from 'uuid';

import { WindowState } from './useWindowState.types';

export const useWindowState = (): WindowState => {
  const [windowState, setWindowState] = useState<WindowState>(() => ({
    width: 0,
    height: 0,
    token: uuidv4(),
    fullHeight: 0,
  }));
  const [windowStateCached] = useDebounce(windowState, 300);

  useEffect(() => {
    const handleResize = () =>
      setWindowState({
        width: innerWidth,
        height: innerHeight,
        token: uuidv4(),
        fullHeight: document.body.scrollHeight,
      });
    handleResize();
    addEventListener('resize', handleResize);
    return () => removeEventListener('resize', handleResize);
  }, []);

  return windowStateCached;
};
