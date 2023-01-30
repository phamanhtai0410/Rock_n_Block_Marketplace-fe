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
import { GameCompanyList } from './GameCompanyList';
import { Activity } from './Activity';
import { Network } from './Network';
import { Ownership } from './Ownership';
import { Promotion } from './Promotion';
import { Property } from './Property';

export interface TokenFull {
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
  game: GameCompanyList;
  hasDigitalKey: boolean;
  highestBid: Bid;
  history?: Activity[];
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
  properties: Property[];
  sellers?: Ownership[];
  standard?: string;
  startAuction?: string;
  totalSupply: number;
  usdPrice: number;
  viewsCount?: string;
}
