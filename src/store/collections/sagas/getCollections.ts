import { baseApi } from 'store/api/apiRequestBuilder';
import { getCollections } from 'store/collections/actions';
import { wrap } from 'store/utils';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { SearchType } from 'types/requests';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';
import collectionsSelectors from '../selectors';

export function* getCollectionsSaga({
  payload: { id, text, page = 1, itemsPerPage = 8, relatedCollections, network, game },
}: ReturnType<typeof getCollections>) {
  const { collections: previousCollections } = yield* select(collectionsSelectors.getCollections);

  if (page === 1) {
    yield* put(
      updateCollectionsState({
        collections: [],
        totalCollectionPages: 1,
      }),
    );
  }

  const { data: collections } = yield* call(baseApi.search, {
    type: SearchType.Collections,
    orderBy: 'name',
    relatedCollections,
    text,
    page,
    itemsPerPage,
    category: id,
    network,
    game,
  });

  const camelizedCollections = camelize(collections) as any;

  yield* put(
    updateCollectionsState({
      collections: [...(page > 1 ? previousCollections : []), ...(camelizedCollections.results as any)],
      totalCollectionPages: camelizedCollections.totalPages,
    }),
  );
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_COLLECTIONS, wrap(getCollectionsSaga));
}
