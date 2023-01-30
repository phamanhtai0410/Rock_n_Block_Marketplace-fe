import { createAction } from '@reduxjs/toolkit';
import {
  ApproveNftReq,
  ApproveReq,
  EmailSubscPayload,
  FollowPayload,
  GetFollowersPayload,
  GetFollowingPayload,
  LoginReq,
  RequestWithWeb3Provider,
  UpdateUserCoverPayload,
  UpdateUserDataPayload,
  UpdateUserDataReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const getData = createAction<RequestWithWeb3Provider>(actionTypes.GET_DATA);
export const getHomeData = createAction<RequestWithWeb3Provider>(actionTypes.GET_HOME_DATA);
export const getExploreData = createAction<RequestWithWeb3Provider>(actionTypes.GET_EXPLORE_DATA);
export const getTopUsers = createAction(actionTypes.GET_TOP_USERS);
export const getServiceFee = createAction<{ network: string }>(actionTypes.GET_SERVICE_FEE);

export const follow = createAction<FollowPayload>(actionTypes.FOLLOW);
export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const approveNft = createAction<ApproveNftReq>(actionTypes.APPROVE_NFT);
export const getTokenBalance = createAction<RequestWithWeb3Provider>(actionTypes.GET_TOKEN_BALANCE);
export const getUserData = createAction<UpdateUserDataReq>(actionTypes.GET_USER_DATA);
export const updateUserData = createAction<UpdateUserDataPayload>(actionTypes.UPDATE_USER_DATA);
export const updateUserCover = createAction<UpdateUserCoverPayload>(actionTypes.UPDATE_USER_COVER);
export const login = createAction<LoginReq>(actionTypes.LOGIN);
export const getSelfInfo = createAction(actionTypes.GET_SELF_INFO);
export const getRates = createAction<RequestWithWeb3Provider>(actionTypes.GET_RATES);
export const getFollowers = createAction<GetFollowersPayload>(actionTypes.GET_FOLLOWERS);
export const getFollowing = createAction<GetFollowingPayload>(actionTypes.GET_FOLLOWING);
export const subscribeMail = createAction<EmailSubscPayload>(actionTypes.SUBSCRIBE_MAIL);

export const connectToWebsocket = createAction(actionTypes.CONNECT_TO_WEBSOCKET);
