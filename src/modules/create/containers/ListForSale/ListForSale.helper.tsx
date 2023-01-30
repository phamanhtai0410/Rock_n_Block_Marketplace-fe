import { Eth, Usdt, Weth } from 'components/Icon/components';

import { Currencies } from './ListForSale.types';

export const currentCurrencies: Currencies[] = [
  { token: 'USDT', TokenIcon: Usdt, isNative: false },
  { token: 'ETH', TokenIcon: Eth, isNative: true },
  { token: 'WETH', TokenIcon: Weth, isNative: false },
];

export const initialListingOptions = ['Price', 'Auction', 'Time Auction'];

export const initialTimestampOptions = [
  { timeStampHours: 12, timeStampSeconds: 43200 },
  { timeStampHours: 24, timeStampSeconds: 86400 },
  { timeStampHours: 48, timeStampSeconds: 172800 },
];
