/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { TokenFull } from 'types/api/TokenFull';
import { camelize } from 'utils';

import { removeFromSale } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftState } from '../reducer';

export function* removeFromSaleSaga({ type, payload: { id } }: ReturnType<typeof removeFromSale>) {
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.removeFromSale, { id });

    const camelizedNftData = camelize<TokenFull>(data);

    yield put(
      updateNftState({
        nft: camelizedNftData,
      }),
    );
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.REMOVE_FROM_SALE, removeFromSaleSaga);
}
