import { call } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { put, takeLatest } from 'typed-redux-saga';
import { Activity } from 'types/api/Activity';
import { camelize } from 'utils';

import { getHeaderNotifications } from '../actions';
import actionTypes from '../actionTypes';
import { updateHeaderNotifications } from '../reducer';

export function* getHeaderNotificationsSaga({ type }: ReturnType<typeof getHeaderNotifications>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getHeaderNotifications);

    const camelizedNotifications = camelize(data) as Activity[];

    yield* put(updateHeaderNotifications(camelizedNotifications));

    yield* put(apiActions.success(type));
  } catch (error) {
    console.error(error);
    yield* put(apiActions.error(type, error));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_HEADER_NOTIFICATIONS, getHeaderNotificationsSaga);
}
