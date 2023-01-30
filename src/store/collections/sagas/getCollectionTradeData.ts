import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getCollectionTradeData } from '../actions';
import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';

export function* getCollectionTradeDataSaga({
  payload,
}: {
  payload: ReturnType<typeof getCollectionTradeData>['payload'];
}) {
  const { data: collectionTradeData } = yield* call(baseApi.getCollectionTradeData, {
    id: payload.id,
    days: payload.days,
  });
  const collectionTradeDataCamelized = camelize(collectionTradeData) as any;

  yield* put(
    updateCollectionsState({
      collectionActivityAveragePrice: +(collectionTradeDataCamelized?.avgPrice || 0),
      collectionActivityVolume: +(collectionTradeDataCamelized?.volume || 0),
    }),
  );
}

export function* watchGetCollectionTradeData() {
  yield* takeLatest(actionTypes.GET_COLLECTION_TRADE_DATA, wrap(getCollectionTradeDataSaga));
}
