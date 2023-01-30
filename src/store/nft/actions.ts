import { createAction } from '@reduxjs/toolkit';
import {
  BidReq,
  BurnReq,
  BuyReq,
  CreateNftReq,
  PromoteReq,
  RequestWithWeb3Provider,
  SetOnAuctionReq,
  SetOnSaleReq,
  TransferReq,
  WithId,
} from 'types/requests';

import actionTypes from './actionTypes';

export const getNftData = createAction<WithId & RequestWithWeb3Provider>(actionTypes.GET_NFT_DATA);
export const like = createAction<WithId>(actionTypes.LIKE);
export const getRelatedTokens = createAction<WithId>(actionTypes.GET_RELATED_TOKENS);
export const setOnSale = createAction<SetOnSaleReq>(actionTypes.SET_ON_SALE);
export const setOnAuction = createAction<SetOnAuctionReq>(actionTypes.SET_ON_AUCTION);
export const burn = createAction<BurnReq>(actionTypes.BURN);
export const transfer = createAction<TransferReq>(actionTypes.TRANSFER);
export const removeFromSale = createAction<WithId & RequestWithWeb3Provider>(actionTypes.REMOVE_FROM_SALE);
export const promote = createAction<PromoteReq>(actionTypes.PROMOTE);
export const getPromotionData = createAction(actionTypes.GET_PROMOTION_DATA);
export const createNft = createAction<CreateNftReq>(actionTypes.CREATE_NFT);
export const buy = createAction<BuyReq>(actionTypes.BUY);
export const bid = createAction<BidReq>(actionTypes.BID);
export const endAuction = createAction<WithId & RequestWithWeb3Provider>(actionTypes.END_AUCTION);
