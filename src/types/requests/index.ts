import { NavigateFunction } from 'react-router';
import BigNumber from 'bignumber.js';
import { IFormInputs } from 'modules/profile/pages/EditProfile';
import { Currency } from 'types/api/Currency';
import { Chains } from 'types/connect';
import { ProfileTab } from 'types/store';
import Web3 from 'web3';

export * from './gameRequests';

export enum SearchType {
  Items = 'items',
  Collections = 'collections',
  Users = 'users',
}

export interface RequestWithWeb3Provider {
  web3Provider: Web3;
}

export type SearchNftsPayload = {
  query: string;
};
export type SearchNftReq = {
  type?: string;
  categories?: string;
  collections?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  orderBy?: string;
  properties?: string;
  onSale?: boolean;
  onAucSale?: boolean;
  onTimedAucSale?: boolean;
  onAnySale?: boolean | string;
  onAnySaleBy?: boolean | string;
  standard?: 'ERC721' | 'ERC1155' | '';
  currency?: string;
  page?: number;
  itemsPerPage?: string | number;
  network?: string;
  creator?: number | string;
  text?: string;
  owner?: number | string;
  soldBy?: number | string;
  bidsBy?: number | string;
  likedBy?: number | string;
  game?: string;
};

export type GetNftsPayload = {
  requestData: SearchNftReq;
  shouldConcat?: boolean;
};

export type GetMaxPrice = {
  currency?: string;
  network?: string;
  collection?: string;
  game?: number | string;
};

export type FollowPayload = {
  isFollowing: boolean;
  id: string | number;
};

export type GetProfileTabDataPayload = {
  profileId: string;
  profileTab: ProfileTab;
  page?: number;
  itemsPerPage?: number;
  network?: string;
};

export type GetCollections = {
  text?: string;
  page?: number;
  itemsPerPage?: number;
  relatedCollections?: string | number;
  network?: string;
  game?: string;
} & WithId;

export type GetFilterGames = {
  text?: string;
  page?: number;
  itemsPerPage?: number;
  orderBy?: string;
  network?: string;
};

export type GetCollectionActivity = {
  days: number | string;
  showSales: boolean;
  showListings: boolean;
  showBids: boolean;
  showTransfers: boolean;
} & WithId &
  Pagination;

export type GetCollectionTradeData = {
  days: number | string;
} & WithId;

export type UpdateUserDataPayload = IFormInputs;

export type UpdateUserCoverPayload = Pick<IFormInputs, 'cover'>;

export type GetTokenBalancesPayload = {
  tokens: Currency[];
} & RequestWithWeb3Provider;

export type GetHeaderNotificationsPayload = {
  network?: string;
};

export type GetUserNotificationsPayload = {
  network?: string;
  type?: string;
  page?: string;
  itemsPerPage?: string;
  address: string;
  isConcat?: boolean;
  isFollowers: boolean;
};

export type ViewNotificationsPayload = {
  activityIds?: number[];
  method?: string;
};

export type GetFollowersPayload = {
  id: number | string;
};

export type GetFollowingPayload = {
  id: number | string;
};

// *some of it will delete when contact will applied

export type UpdateUserProps = 'tokenBalance' | 'nativeBalance' | 'userStakes' | 'rankId';

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

export type ApproveReq = {
  amount: string | BigNumber;
  spender: string;
  tokenAddress: string;
  isMax?: boolean;
} & RequestWithWeb3Provider;

export type ApproveNftReq = {
  operator: string;
  approved: boolean;
  tokenAddress: string;
} & RequestWithWeb3Provider;

export type ClaimReq = {
  vestingPeriods: string[];
} & RequestWithWeb3Provider;

export type UpdateUserDataReq = RequestWithWeb3Provider;

export type ClaimRewardReq = {
  rewardTokenAmount: string;
  airdropNumber: number;
  proof: string[];
  id: number;
} & RequestWithWeb3Provider;

export type GetNftDataReq = {
  tokenId: string;
};

export type WithId = {
  id: string;
};

export type Pagination = {
  page?: number;
  itemsPerPage?: number;
  shouldConcat?: boolean;
};

export type TrackTransactionReq = {
  txHash: string;
  token: number;
  ownership: string;
  amount?: number;
};

export type BuyReq = {
  data: {
    tokenAmount: number;
    sellerId: string;
  } & WithId;
  decimals?: number;
  tokenPrice: string;
  tokenAddress: string;
} & RequestWithWeb3Provider;

export type BidReq = {
  data: {
    amount: number;
    currency: string;
    tokenId: string;
  };
  decimals?: number;
  tokenAddress: string;
} & RequestWithWeb3Provider;

export type BuyReject = {
  id: string;
  owner: string;
};

export type PromoteReq = {
  data: {
    package: number;
    currency: string;
    tokenId: string;
  };
  decimals?: number;
  tokenAmount: string;
  tokenAddress: string;
} & RequestWithWeb3Provider;

export type TransferReq = {
  amount?: number;
  address?: string;
} & RequestWithWeb3Provider &
  WithId;

export type BurnReq = {
  amount?: number;
} & RequestWithWeb3Provider &
  WithId;

export type SetOnSaleReq = {
  data: {
    price: number;
    currency: string;
    amount?: number;
  };
  tokenAddress?: string;
  isUpdatePrice?: boolean;
} & WithId &
  RequestWithWeb3Provider;

export type SetOnAuctionReq = {
  data: {
    minimalBid: number;
    currency: string;
    amount?: number;
    startAuction?: number;
    endAuction?: number;
  };
  tokenAddress?: string;
  isUpdatePrice?: boolean;
} & WithId &
  RequestWithWeb3Provider;

export type LoginReq = {
  address: string;
  signedMsg?: string;
  provider?: string;
  network?: Chains;
} & RequestWithWeb3Provider;

export enum NftVariantType {
  collection = 'collection',
  token = 'token',
}

export type MintRejectReq = {
  type: NftVariantType;
  owner?: number | string;
} & WithId;

export type CreateNftReq = {
  data: {
    dataForCreation: FormData;
    isListForSaleNow: boolean;
  };
  navigate?: NavigateFunction;
  tokenAddress: string;
} & RequestWithWeb3Provider;

export type EditCollectionReq = {
  data: {
    description: string;
    site: string;
    telegram: string;
    twitter: string;
    medium: string;
    discord: string;
    instagram: string;
    avatar: File | null | string;
  } & WithId;
};

export type GetProfileInfoByIdReq = {
  id: string | number;
  itemsPerPage: number;
};

export type GetTrendingTokensPayload = {
  category: string;
};

export type EmailSubscPayload = {
  emailAddress: string;
};
