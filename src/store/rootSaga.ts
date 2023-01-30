import { fork } from 'redux-saga/effects';
import collectionsSaga from 'store/collections/sagas';
import gamesSagas from 'store/games/sagas';
/* PLOP_INJECT_IMPORT_SAGA */
import nftSaga from 'store/nft/sagas';
import nftsSaga from 'store/nfts/sagas';
import notificationsSaga from 'store/notifications/sagas';
import profileSagas from 'store/profile/sagas';
import userSaga from 'store/user/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(nftsSaga);
  yield fork(notificationsSaga);
  /* PLOP_INJECT_FORK_SAGA */
  yield fork(collectionsSaga);
  yield fork(nftSaga);
  yield fork(profileSagas);
  yield fork(gamesSagas);
}
