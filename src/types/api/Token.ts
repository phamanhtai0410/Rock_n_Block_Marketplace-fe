/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Bid } from './Bid';
import { Category } from './Category';
import { CollectionSlim } from './CollectionSlim';
import { UserSlim } from './UserSlim';
import { Currency } from './Currency';
import { Network } from './Network';
import { Ownership } from './Ownership';
import { Promotion } from './Promotion';

export interface Token {
  animation?: string;
  available?: number;
  bids?: Bid[];
  category: Category;
  collection: CollectionSlim;
  createdAt?: string;
  creator: UserSlim;
  currency: Currency;
  description?: string;
  digitalKey?: string;
  endAuction?: string;
  externalLink?: string;
  format?: string;
  hasDigitalKey: boolean;
  highestBid: Bid;
  id?: number;
  internalId?: string;
  isAucSelling: boolean;
  isLiked?: boolean;
  isSelling?: boolean;
  isTimedAucSelling: boolean;
  likeCount?: number;
  media?: string;
  minimalBid?: string;
  name: string;
  network: Network;
  onPromotion?: boolean;
  owners?: Ownership[];
  price?: string;
  promotionInfo?: Promotion;
  sellers?: Ownership[];
  standard?: string;
  totalSupply: number;
  usdPrice: number;
}
