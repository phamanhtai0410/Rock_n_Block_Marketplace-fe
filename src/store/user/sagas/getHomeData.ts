import { ITEMS_PER_PAGE_9 } from 'appConstants';
import { getTopCollectionsSaga } from 'store/collections/sagas/getTopCollections';
import gameActionTypes from 'store/games/actionTypes';
import { getGamesSaga } from 'store/games/sagas/getGames';
import { getFavoritesSaga } from 'store/nfts/sagas/getFavoriteTokens';
import { getTrendingTokensSaga } from 'store/nfts/sagas/getTrendingTokens';
import { anyCombinator, wrap } from 'store/utils';
import { call, takeLatest } from 'typed-redux-saga';

import { getHomeData } from '../actions';
import actionTypes from '../actionTypes';

import { getTopUsersSaga } from './getTopUsers';

export function* getHomeDataSaga({ payload }: { payload: ReturnType<typeof getHomeData>['payload'] }) {
  yield* anyCombinator([
    call(getTopUsersSaga, { payload: undefined }),
    call(getFavoritesSaga, { payload: undefined }),
    call(getTrendingTokensSaga, { payload: { category: '' } }),
    call(getTopCollectionsSaga, { payload: { itemsPerPage: ITEMS_PER_PAGE_9, page: 1 } }),
    call(getGamesSaga, { type: gameActionTypes.GET_GAMES_DATA, payload: { itemsPerPage: ITEMS_PER_PAGE_9, page: 1 } }),
  ]);
}

export function* watchGetHomeData() {
  yield* takeLatest(actionTypes.GET_HOME_DATA, wrap(getHomeDataSaga));
}
