import { useCallback } from 'react';

import { useStateWithCallback } from './useStateWithCallback';

export const useStateAsync = <S>(initialState: S | (() => S)): [S, (newState: S) => Promise<null>] => {
  const [state, setState] = useStateWithCallback(initialState);

  const setStateAsync = useCallback(
    async (newState: S) => {
      return new Promise<null>((resolve) => {
        setState(newState, () => resolve(null));
      });
    },
    [setState],
  );

  return [state, setStateAsync];
};
