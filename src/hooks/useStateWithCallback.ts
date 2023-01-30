import { useCallback, useEffect, useRef, useState } from 'react';

type Callback<S> = null | ((state?: S) => void);

export const useStateWithCallback = <S>(
  initialState: S | (() => S),
): [S, (newState: S, callback?: Callback<S>) => void] => {
  const [state, setState] = useState(initialState);

  const callbackRef = useRef<Callback<S>>(null);

  const setStateWithCallback = useCallback((newState: S, callback: Callback<S> = null) => {
    callbackRef.current = callback;
    setState(newState);
  }, []);

  useEffect(() => {
    callbackRef.current?.(state);
    callbackRef.current = null;
  }, [state]);

  return [state, setStateWithCallback];
};
