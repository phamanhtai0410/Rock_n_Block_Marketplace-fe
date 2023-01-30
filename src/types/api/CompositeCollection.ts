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

export interface CompositeCollection {
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
  likesCount?: number;
  medium?: string;
  name?: string;
  network: Network;
  site?: string;
  standard?: Standard;
  symbol?: string;
  telegram?: string;
  tokens?: string[];
  twitter?: string;
  url?: string;
  volumeTraded?: number;
}
