import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getFollowing } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getFollowingSaga({ payload: { id } }: { payload: ReturnType<typeof getFollowing>['payload'] }) {
  const { data } = yield* call(baseApi.getFollowing, id);
  yield* put(updateUserState({ following: camelize(data) }));
}

export function* watchGetFollowing() {
  yield* takeLatest(actionTypes.GET_FOLLOWING, wrap(getFollowingSaga));
}
