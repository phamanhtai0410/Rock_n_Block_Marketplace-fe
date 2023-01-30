import { fork } from 'redux-saga/effects';

import approve from './approve';
import approveNft from './approveNft';
import connectToWebsockets from './connectToWebsockets';
import { watchFollow } from './follow';
import { watchGetData } from './getData';
import { watchGetExploreData } from './getExploreData';
import { watchGetFollowers } from './getFollowers';
import { watchGetFollowing } from './getFollowing';
import { watchGetHomeData } from './getHomeData';
import getRates from './getRates';
import getSelfInfo from './getSelfInfo';
import getServiceFee from './getServiceFee';
import getUserData from './getUserData';
import login from './login';
import subscribeMailSaga from './subscribeMail';
import updateUserCover from './updateCover';
import updateUserData from './updateUserData';

export default function* userSagas() {
  yield fork(watchGetFollowing);
  yield fork(watchGetFollowers);
  yield fork(watchGetExploreData);
  yield fork(watchGetHomeData);
  yield fork(watchGetData);
  yield fork(watchFollow);
  yield fork(approve);
  yield fork(approveNft);
  yield fork(getUserData);
  yield fork(login);
  yield fork(updateUserData);
  yield fork(getSelfInfo);
  yield fork(getRates);
  yield fork(getServiceFee);
  yield fork(connectToWebsockets);
  yield fork(updateUserCover);
  yield fork(subscribeMailSaga);
}
