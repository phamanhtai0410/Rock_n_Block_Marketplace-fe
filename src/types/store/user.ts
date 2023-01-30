import { Nullable, WalletProviders } from 'types';
import { Currency } from 'types/api/Currency';
import { PaginateUserFollow } from 'types/api/PaginateUserFollow';
import { User } from 'types/api/User';
import { UserStat } from 'types/api/UserStat';
import { Chains } from 'types/connect';

export enum Themes {
  light = 'light',
  dark = 'dark',
}

export type Token = Currency & {
  decimals?: number;
  userBalance?: string;
};

// *will delete later because of lots of usage of this type (errors)*
export type UserState = {
  address: string;
  provider: WalletProviders;
  chainType: 'mainnet' | 'testnet';
  network: Chains;
  rankId: string;
  key: string;
  theme: Themes;

  user: Required<User>;

  tokens: Currency[];
  tokenData: Token[];
  topUsers: UserStat[];
  followers: Nullable<PaginateUserFollow>;
  following: Nullable<PaginateUserFollow>;

  serviceFee: string;
};
