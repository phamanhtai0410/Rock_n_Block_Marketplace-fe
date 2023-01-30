import nftActionTypes from 'store/nft/actionTypes';
import nftsActionTypes from 'store/nfts/actionTypes';
import notificationsActionTypes from 'store/notifications/actionTypes';
import userActionTypes from 'store/user/actionTypes';
import { UIState } from 'types';
import { RequestStatus } from 'types/store';

import { getUIReducer } from '.';

const initialState: UIState = {
  [userActionTypes.APPROVE]: RequestStatus.INIT,
  [nftsActionTypes.SEARCH_NFTS]: RequestStatus.INIT,
  [nftsActionTypes.GET_NFTS]: RequestStatus.INIT,
  [nftActionTypes.GET_NFT_DATA]: RequestStatus.INIT,
  [nftActionTypes.GET_NFT_DATA]: RequestStatus.INIT,
  [notificationsActionTypes.GET_HEADER_NOTIFICATIONS]: RequestStatus.INIT,
  [notificationsActionTypes.GET_USER_NOTIFICATIONS]: RequestStatus.INIT,
  [notificationsActionTypes.VIEW_NOTIFICATION]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
