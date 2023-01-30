import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils/camelize';

import { getFollowers } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getFollowersSaga({ payload: { id } }: { payload: ReturnType<typeof getFollowers>['payload'] }) {
  const { data } = yield* call(baseApi.getFollowers, id);
  yield* put(updateUserState({ followers: camelize(data) }));
}

export function* watchGetFollowers() {
  yield* takeLatest(actionTypes.GET_FOLLOWERS, wrap(getFollowersSaga));
}
