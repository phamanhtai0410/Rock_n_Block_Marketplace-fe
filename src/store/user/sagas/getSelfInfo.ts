import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getSelfInfo } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getSelfInfoSaga({ type }: ReturnType<typeof getSelfInfo>) {
  yield* put(request(type));

  try {
    const { data } = yield* call(baseApi.getSelfInfo);
    yield* put(updateUserState({ user: camelize(data) }));

    yield* put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_SELF_INFO, getSelfInfoSaga);
}
