import { baseApi } from 'store/api/apiRequestBuilder';
import { updateSingleProfile } from 'store/profile/reducer';
import profileSelector from 'store/profile/selectors';
import { wrap } from 'store/utils';
import { call, put, select, takeLatest } from 'typed-redux-saga';

import { follow } from '../actions';
import actionTypes from '../actionTypes';

export function* followSaga({ payload: { isFollowing, id } }: { payload: ReturnType<typeof follow>['payload'] }) {
  const { followersCount } = yield select(profileSelector.getProp('profile'));

  if (isFollowing) {
    yield* call(baseApi.unFollow, id);
    yield put(updateSingleProfile({ followersCount: followersCount - 1 }));
  } else {
    yield* call(baseApi.follow, id);
    yield put(updateSingleProfile({ followersCount: followersCount + 1 }));
  }
}

export function* watchFollow() {
  yield* takeLatest(actionTypes.FOLLOW, wrap(followSaga));
}
