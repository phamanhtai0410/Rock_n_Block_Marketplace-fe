import { useMemo } from 'react';
import { Currency } from 'types/api/Currency';
import { useDebounce } from 'use-debounce/esm';

export const useConvertCurrenciesToFilters = (currencies: Currency[], chosenNetwork = '') => {
  const convertedCurrency = useMemo(
    () =>
      currencies.map(({ symbol, network }) => ({
        value: `${symbol}_${network}`,
        title: `${symbol}`,
        network: network as string,
      })),
    [currencies],
  );

  if (chosenNetwork) {
    return convertedCurrency.filter((item) => item.network === chosenNetwork);
  }

  return convertedCurrency;
};

export const useDebouncePrice = ({ minPrice, maxPrice, time }) => {
  const [maxPriceDebounced] = useDebounce(maxPrice, time);
  const [minPriceDebounced] = useDebounce(minPrice, time);

  return [minPriceDebounced, maxPriceDebounced];
};
