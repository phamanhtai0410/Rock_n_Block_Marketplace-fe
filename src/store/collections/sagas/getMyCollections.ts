import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { ICollection } from 'types';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';

export function* getMyCollectionsSaga() {
  const { data: collections } = yield* call(baseApi.getMyCollections);
  const camelizedCollections = camelize(collections.results) as ICollection[];
  yield* put(updateCollectionsState({ myCollections: camelizedCollections }));
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_MY_COLLECTIONS, wrap(getMyCollectionsSaga));
}
