import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Stack, SxProps, Theme } from '@mui/material';
import { ethMaskAddress } from 'appConstants';
import BigNumber from 'bignumber.js';
import { QuantityInput } from 'components';
import { validateOnlyNumbers } from 'utils';

import { AmountInput, CurrencySelector, OptionSelector, TimestampSelector } from './components';
import { initialListingOptions, initialTimestampOptions } from './ListForSale.helper';
import { Listings, Rates } from './ListForSale.types';

export interface ListForSaleProps {
  isMultiple?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onListForSale?: (key: saleTokenStateKeys, selectedSaleData: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateOuterState?: (data: any) => void;
  maxAmount?: number;
  rates: Rates[];
  sx?: SxProps<Theme>;
  error?: boolean;
  createNftTokenMessage?: ReactNode;
  isModal?: boolean;
}

export enum saleTokenStateKeys {
  listType = 'listType',
  selectedTimestamp = 'selectedTimestamp',
  selectedCurrency = 'selectedCurrency',
  amount = 'amount',
  priceValue = 'priceValue',
}

export const ListForSale: FC<ListForSaleProps> = ({
  isMultiple,
  onListForSale,
  updateOuterState,
  maxAmount,
  rates,
  sx,
  error,
  createNftTokenMessage,
  isModal,
}) => {
  const [saleTokenState, setSaleTokenState] = useState({
    [saleTokenStateKeys.listType]: initialListingOptions[0],
    [saleTokenStateKeys.selectedTimestamp]: initialTimestampOptions[0].timeStampSeconds,
    [saleTokenStateKeys.selectedCurrency]: rates[2],
    [saleTokenStateKeys.amount]: 1,
    [saleTokenStateKeys.priceValue]: '',
  });

  const sortedCurrencies = useMemo(
    () =>
      saleTokenState.listType === Listings.Price || isMultiple
        ? rates
        : rates.filter((currency) => currency.address !== ethMaskAddress),
    [saleTokenState.listType, isMultiple, rates],
  );

  const isTimestampSelectorActive = useMemo(
    () => saleTokenState.listType === Listings.TimeAuction,
    [saleTokenState.listType],
  );
  const handleChange = useCallback(
    (key: saleTokenStateKeys, value: any) => {
      if (key === saleTokenStateKeys.priceValue) {
        if (validateOnlyNumbers(value)) {
          setSaleTokenState((prevState) => ({ ...prevState, [key]: value }));
          onListForSale?.(key, value);
        }
        return;
      }

      setSaleTokenState((prevState) => ({ ...prevState, [key]: value }));
      onListForSale?.(key, value);
      if (Object.keys(Listings).includes(value)) {
        setSaleTokenState((prevState) => ({ ...prevState, selectedCurrency: sortedCurrencies[0] }));
        onListForSale?.(saleTokenStateKeys.selectedCurrency, sortedCurrencies[0]);
      }
    },
    [onListForSale, sortedCurrencies],
  );

  const priceInUsd = useMemo(() => {
    const selectedToken = rates.find((tokenRate) => tokenRate.symbol === saleTokenState.selectedCurrency.symbol);
    if (selectedToken && saleTokenState.priceValue) {
      return new BigNumber(selectedToken.rate).multipliedBy(saleTokenState.priceValue).toFixed(2);
    }
    return '0.00';
  }, [saleTokenState.selectedCurrency, rates, saleTokenState.priceValue]);

  useEffect(() => {
    updateOuterState?.(saleTokenState);
  }, [saleTokenState, updateOuterState]);

  return (
    <Stack sx={{ width: '100%', ...sx }} spacing={3}>
      {!isMultiple && (
        <OptionSelector
          value={saleTokenState.listType as Listings}
          onSelect={(option) => handleChange(saleTokenStateKeys.listType, option)}
          options={initialListingOptions}
        />
      )}
      {createNftTokenMessage}
      <CurrencySelector
        sortedCurrencies={sortedCurrencies}
        selectedCurrencySymbol={saleTokenState.selectedCurrency?.symbol}
        onCurrencyClick={(currency) => handleChange(saleTokenStateKeys.selectedCurrency, currency)}
        isModal
      />
      {isMultiple && (
        <QuantityInput
          value={saleTokenState.amount}
          onChange={(quantity) => handleChange(saleTokenStateKeys.amount, quantity)}
          maxAmount={maxAmount}
          error={error}
        />
      )}
      {isTimestampSelectorActive && (
        <TimestampSelector
          timestampOptions={initialTimestampOptions}
          selectedTimestamp={saleTokenState.selectedTimestamp}
          onTimestampClick={(timestamp) => handleChange(saleTokenStateKeys.selectedTimestamp, timestamp)}
        />
      )}
      <AmountInput
        label={saleTokenState.listType === 'Price' ? 'Price' : 'Bid'}
        priceValue={saleTokenState.priceValue}
        priceInUsd={priceInUsd}
        onPriceValueChange={(e) => handleChange(saleTokenStateKeys.priceValue, e.target.value)}
      />
    </Stack>
  );
};
