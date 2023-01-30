import { fork } from 'redux-saga/effects';

import getProfileInfoById from './getProfileInfoById';
import { watchGetProfileTabData } from './getProfileTabData';

export default function* profileSagas() {
  yield fork(getProfileInfoById);
  yield fork(watchGetProfileTabData);
}
