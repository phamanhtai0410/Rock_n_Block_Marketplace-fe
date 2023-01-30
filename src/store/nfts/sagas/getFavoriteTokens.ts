import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getFavoriteTokens } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftsState } from '../reducer';

export function* getFavoritesSaga({ payload }: { payload: ReturnType<typeof getFavoriteTokens>['payload'] }) {
  const { data: favoriteTokens } = yield* call(baseApi.getFavorites);
  yield* put(updateNftsState({ favoriteTokens: camelize(favoriteTokens) }));
}

export function* watchGetFavorites() {
  yield* takeLatest(actionTypes.GET_FAVORITE_TOKENS, wrap(getFavoritesSaga));
}
