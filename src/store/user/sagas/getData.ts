import { wrap } from 'store/utils';
import { call, takeLatest } from 'typed-redux-saga';

import { getData } from '../actions';
import actionTypes from '../actionTypes';

import { getRatesSaga } from './getRates';

export function* getDataSaga({ payload: { web3Provider } }: ReturnType<typeof getData>) {
  yield* call(getRatesSaga, { type: actionTypes.GET_RATES, payload: { web3Provider } });
}

export function* watchGetData() {
  yield* takeLatest(actionTypes.GET_DATA, wrap(getDataSaga));
}
