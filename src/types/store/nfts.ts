import { Nullable } from 'types';
import { Category } from 'types/api/Category';
import { FastSearch } from 'types/api/FastSearch';
import { PaginateToken } from 'types/api/PaginateToken';
import { Token } from 'types/api/Token';
import { TokenFull } from 'types/api/TokenFull';

export type Nft = {
  id: number;
  name: string;
};

export type NftsState = {
  presearchNfts: FastSearch | undefined;
  exploreNfts: Nullable<Partial<PaginateToken>>;
  categories: Category[];
  favoriteTokens: TokenFull[];
  trendingTokens: Token[];
  maxPrice: number;
};
