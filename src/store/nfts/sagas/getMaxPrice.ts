/* eslint-disable camelcase */
import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';

import { getMaxPrice } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftsState } from '../reducer';

export function* getMaxPriceSaga({ payload }: ReturnType<typeof getMaxPrice>) {
  const {
    data: { max_price },
  } = yield* call(baseApi.getMaxPrice, payload);
  yield* put(updateNftsState({ maxPrice: max_price }));
}

export default function* watchGetMaxPriceSaga() {
  yield* takeLatest(actionTypes.GET_MAX_PRICE, wrap(getMaxPriceSaga));
}
