import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getCollectionActivity } from '../actions';
import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';
import collectionsSelectors from '../selectors';

export function* getCollectionActivitySaga({
  payload,
}: {
  payload: ReturnType<typeof getCollectionActivity>['payload'];
}) {
  if (payload?.page === 1) {
    yield* put(updateCollectionsState({ collectionActivity: null }));
  }
  const { collectionActivity: previousCollectionActivity } = yield* select(collectionsSelectors.getCollections);
  const { data: collectionActivity } = yield* call(baseApi.getCollectionActivity, payload);
  const collectionActivityCamelized = camelize(collectionActivity) as any;

  yield* put(
    updateCollectionsState({
      collectionActivity: {
        ...collectionActivityCamelized,
        results: [
          ...((payload?.page || 1) > 1 ? previousCollectionActivity?.results || [] : []),
          ...collectionActivityCamelized.results,
        ],
      },
    }),
  );
}

export function* watchGetCollectionActivity() {
  yield* takeLatest(actionTypes.GET_COLLECTION_ACTIVITY, wrap(getCollectionActivitySaga));
}
