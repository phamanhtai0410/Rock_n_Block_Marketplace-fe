import { getCategoriesSaga } from 'store/nfts/sagas/getCategories';
import { anyCombinator, wrap } from 'store/utils';
import { call, takeLatest } from 'typed-redux-saga';

import { getExploreData } from '../actions';
import actionTypes from '../actionTypes';

export function* getExploreDataSaga({ payload }: { payload: ReturnType<typeof getExploreData>['payload'] }) {
  yield* anyCombinator([
    call(getCategoriesSaga, { payload: undefined }),
    // call(getCollectionsSaga, { type: collectionActionTypes.GET_COLLECTIONS, payload: {} }),
  ]);
}

export function* watchGetExploreData() {
  yield* takeLatest(actionTypes.GET_EXPLORE_DATA, wrap(getExploreDataSaga));
}
