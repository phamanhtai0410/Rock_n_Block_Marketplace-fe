import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertFiltersToSearchParams } from 'hooks/useFilters/useFilters.helpers';

function removeEmpty(obj) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v.length > 0));
}

export const useProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), [location.search]);

  const [activeProperties, setActiveProperties] = useState(JSON.parse(urlParams.get('properties') || '""') || {});

  const handleSetActiveProperty = useCallback(
    (layerName: string, perkName: string) => {
      if (Object.hasOwn(activeProperties, layerName)) {
        setActiveProperties((prevState) => {
          const perksArray = prevState[layerName];
          const newState = {
            ...prevState,
            [layerName]: perksArray.includes(perkName)
              ? perksArray.filter((name) => name !== perkName)
              : perksArray.concat(perkName),
          };
          const removedEmpty = removeEmpty(newState);
          navigate(
            convertFiltersToSearchParams(
              'properties',
              Object.keys(removedEmpty).length ? JSON.stringify(removedEmpty) : '',
            ),
            { replace: true },
          );

          return removedEmpty;
        });
      } else {
        setActiveProperties((prevState) => {
          const newState = { ...prevState, [layerName]: [perkName] };
          navigate(convertFiltersToSearchParams('properties', JSON.stringify(newState)), { replace: true });

          return newState;
        });
      }
    },
    [activeProperties, navigate],
  );

  return {
    activeProperties,
    handleSetActiveProperty,
  };
};
