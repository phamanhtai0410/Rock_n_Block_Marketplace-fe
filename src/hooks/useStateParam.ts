import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchParams } from 'utils/getSearchParams';

export const useStateParam = <S = string>(
  paramName: string,
  defaultState: S,
): [S, (newStateOrCallback: S | ((prevState: S) => S)) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => {
    const value = searchParams.get(paramName);
    if (value) {
      return JSON.parse(value) as S;
    }
    return defaultState;
  }, [defaultState, paramName, searchParams]);

  const setState = useCallback(
    (newStateOrCallback: S | ((prevState: S) => S)) => {
      const newState =
        typeof newStateOrCallback === 'function'
          ? (newStateOrCallback as (prevState: S) => S)(state)
          : newStateOrCallback;
      const currentSearchParams = getSearchParams();
      const { [paramName]: _, ...params } = Object.fromEntries(currentSearchParams);
      setSearchParams(
        {
          ...params,
          ...(newState !== defaultState && { [paramName]: JSON.stringify(newState) }),
        },
        { replace: true },
      );
    },
    [defaultState, paramName, setSearchParams, state],
  );

  return [state, setState];
};
