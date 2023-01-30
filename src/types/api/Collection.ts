/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { UserSlim } from './UserSlim';
import { Currency } from './Currency';
import { Network } from './Network';
import { Standard } from './enums';

export interface Collection {
  address?: string;
  avatar?: string;
  blockDifference?: string;
  cover?: string;
  creator: UserSlim;
  creatorRoyalty: string;
  currency?: Currency;
  description?: string;
  discord?: string;
  floorPrice?: number;
  instagram?: string;
  isDefault?: boolean;
  isImported?: boolean;
  isVerified?: boolean;
  medium?: string;
  name?: string;
  network: Network;
  ownersCount?: number;
  properties?: any;
  site?: string;
  standard?: Standard;
  subcategoryName?: string;
  symbol?: string;
  telegram?: string;
  tokensCount?: number;
  twitter?: string;
  url?: string;
  volumeTraded?: string;
  volumeTradedCrypto?: number;
}
