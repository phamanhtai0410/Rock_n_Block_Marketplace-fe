import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';

export function* getTopCollectionsSaga({ payload }) {
  const { data: topCollections } = yield* call(baseApi.getTopCollections, payload);
  yield* put(updateCollectionsState({ topCollections: camelize(topCollections) }));
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_TOP_COLLECTIONS, wrap(getTopCollectionsSaga));
}
