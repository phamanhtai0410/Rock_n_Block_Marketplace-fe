import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getCollectionChart } from '../actions';
import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';

export function* getCollectionChartSaga({ payload }: { payload: ReturnType<typeof getCollectionChart>['payload'] }) {
  const { data: collectionChartData } = yield* call(baseApi.getCollectionChart, {
    id: payload.id,
    days: payload.days,
  });
  const collectionTradeDataCamelized = camelize(collectionChartData) as any;

  yield* put(
    updateCollectionsState({
      collectionChart: collectionTradeDataCamelized,
    }),
  );
}

export function* watchGetCollectionChart() {
  yield* takeLatest(actionTypes.GET_COLLECTION_CHART, wrap(getCollectionChartSaga));
}
