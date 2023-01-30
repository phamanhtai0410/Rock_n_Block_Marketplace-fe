import { call, select } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { put, takeLatest } from 'typed-redux-saga';
import { PaginateActivity } from 'types/api/PaginateActivity';
import { camelize } from 'utils';

import { getUserNotifications } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserNotifications } from '../reducer';
import notificationsSelectors from '../selectors';

export function* getUserNotificationsSaga({ type, payload }: ReturnType<typeof getUserNotifications>) {
  yield* put(apiActions.request(type));
  const userNotifications: PaginateActivity = yield select(notificationsSelectors.getProp('userNotifications'));
  const apiCall = payload.isFollowers ? baseApi.getUserFollowersNotifications : baseApi.getUserNotifications;
  try {
    const { data } = yield call(apiCall, payload);

    let camelizedNotifications = camelize(data) as any;

    if (payload.isConcat) {
      camelizedNotifications = {
        ...camelizedNotifications,
        results: [...(userNotifications.results || []), ...camelizedNotifications.results],
      };
    }

    yield* put(updateUserNotifications(camelizedNotifications));

    yield* put(apiActions.success(type));
  } catch (error) {
    console.error(error);
    yield* put(apiActions.error(type, error));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_USER_NOTIFICATIONS, getUserNotificationsSaga);
}
