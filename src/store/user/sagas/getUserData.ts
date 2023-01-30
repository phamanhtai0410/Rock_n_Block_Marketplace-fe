import { select } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';

import { getUserData } from '../actions';
import actionTypes from '../actionTypes';

import { getSelfInfoSaga } from './getSelfInfo';

export function* getUserDataSaga({ type }: ReturnType<typeof getUserData>) {
  yield* put(request(type));
  const { address: userAddress }: UserState = yield select(userSelector.getUser);

  try {
    if (!userAddress.length) {
      return;
    }
    yield* call(getSelfInfoSaga, {
      type: actionTypes.GET_SELF_INFO,
      payload: undefined,
    });

    yield* put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_USER_DATA, getUserDataSaga);
}
