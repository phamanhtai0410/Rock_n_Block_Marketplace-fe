import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getTopUsers } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getTopUsersSaga({ payload }: { payload: ReturnType<typeof getTopUsers>['payload'] }) {
  const { data: topUsers } = yield* call(baseApi.getTopUsers);
  yield* put(updateUserState({ topUsers: camelize(topUsers) }));
}

export function* watchGetTopUsers() {
  yield* takeLatest(actionTypes.GET_TOP_USERS, wrap(getTopUsersSaga));
}
