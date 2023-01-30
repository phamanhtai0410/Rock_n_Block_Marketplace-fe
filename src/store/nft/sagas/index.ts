import { fork } from 'redux-saga/effects';

import bid from './bid';
import burn from './burn';
import buy from './buy';
import createNftListener from './createNft';
import endAuction from './endAuction';
import getNftData from './getNftData';
import getPromotionData from './getPromotionData';
import getRelatedTokens from './getRelatedTokens';
import like from './like';
import promote from './promote';
import removeFromSale from './removeFromSale';
import setOnAuction from './setOnAuction';
import setOnSale from './setOnSale';
import transfer from './transfer';

export default function* nftSagas() {
  yield fork(bid);
  yield fork(burn);
  yield fork(buy);
  yield fork(createNftListener);
  yield fork(endAuction);
  yield fork(getNftData);
  yield fork(getPromotionData);
  yield fork(getRelatedTokens);
  yield fork(like);
  yield fork(promote);
  yield fork(removeFromSale);
  yield fork(setOnAuction);
  yield fork(setOnSale);
  yield fork(transfer);
}
