import { FC } from 'react';
import { SvgIconProps } from '@mui/material';

export enum Listings {
  Price = 'Price',
  Auction = 'Auction',
  TimeAuction = 'Time Auction',
}

export type Currencies = {
  token: 'USDT' | 'ETH' | 'WETH';
  TokenIcon: FC<SvgIconProps>;
  isNative: boolean;
};

export type ListSubmit = {
  newPrice: number;
  newCurrency: string;
  amount?: number;
  timestamp?: number;
};

export type Rates = {
  rate: string;
  symbol: string;
  name: string;
  image: string;
  address?: string;
};
