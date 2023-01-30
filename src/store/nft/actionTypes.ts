const GET_NFT_DATA = 'GET_NFT_DATA';
const GET_PROMOTION_DATA = 'GET_PROMOTION_DATA';
const LIKE = 'LIKE';
const CREATE_NFT = 'CREATE_NFT';
const GET_RELATED_TOKENS = 'GET_RELATED_TOKENS' as const;
const SET_ON_SALE = 'SET_ON_SALE' as const;
const SET_ON_AUCTION = 'SET_ON_AUCTION' as const;
const END_AUCTION = 'END_AUCTION' as const;
const LIST_FOR_SALE = 'LIST_FOR_SALE' as const;
const BURN = 'BURN' as const;
const TRANSFER = 'TRANSFER' as const;
const REMOVE_FROM_SALE = 'REMOVE_FROM_SALE' as const;
const PROMOTE = 'PROMOTE' as const;
const BUY = 'BUY' as const;
const BID = 'BID' as const;

const nftActionTypes = {
  GET_NFT_DATA,
  GET_PROMOTION_DATA,
  GET_RELATED_TOKENS,
  LIKE,
  CREATE_NFT,
  SET_ON_SALE,
  SET_ON_AUCTION,
  LIST_FOR_SALE,
  BURN,
  TRANSFER,
  REMOVE_FROM_SALE,
  PROMOTE,
  BUY,
  BID,
  END_AUCTION,
};

export default nftActionTypes;
