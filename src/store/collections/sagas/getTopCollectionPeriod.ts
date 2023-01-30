import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';

import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';

export function* getTopCollectionPeriod() {
  const { data } = yield* call(baseApi.getConfig);
  yield* put(updateCollectionsState({ topCollectionPeriod: data.top_collections_period }));
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_TOP_COLLECTIONS_PERIOD, wrap(getTopCollectionPeriod));
}
