import { fork } from 'redux-saga/effects';

import getHeaderNotifications from './getHeaderNotifications';
import getUserNotifications from './getUserNotifications';
import viewNotification from './viewNotification';

export default function* notificationsSagas() {
  yield fork(getHeaderNotifications);
  yield fork(getUserNotifications);
  yield fork(viewNotification);
}
