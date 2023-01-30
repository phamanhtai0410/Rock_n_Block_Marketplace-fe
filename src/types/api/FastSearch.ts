/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { CollectionFastSearch } from './CollectionFastSearch';
import { TokenFastSearch } from './TokenFastSearch';
import { UserSlim } from './UserSlim';

export interface FastSearch {
  collections: CollectionFastSearch[];
  tokens: TokenFastSearch[];
  users?: UserSlim[];
}
