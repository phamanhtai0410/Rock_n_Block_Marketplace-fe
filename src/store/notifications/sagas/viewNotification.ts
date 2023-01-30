import { call } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { put, takeEvery } from 'typed-redux-saga';

import { viewNotification } from '../actions';
import actionTypes from '../actionTypes';

import { getHeaderNotificationsSaga } from './getHeaderNotifications';

export function* viewNotificationSaga({ type, payload }: ReturnType<typeof viewNotification>) {
  yield* put(apiActions.request(type));

  try {
    yield call(baseApi.viewNotification, payload);
    yield call(getHeaderNotificationsSaga, {
      type: actionTypes.GET_HEADER_NOTIFICATIONS,
      payload: {
        network: undefined,
      },
    });

    yield* put(apiActions.success(type));
  } catch (error) {
    console.error(error);
    yield* put(apiActions.error(type, error));
  }
}

export default function* listener() {
  yield* takeEvery(actionTypes.VIEW_NOTIFICATION, viewNotificationSaga);
}
