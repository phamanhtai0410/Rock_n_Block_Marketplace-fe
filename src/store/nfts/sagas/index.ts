import { fork } from 'redux-saga/effects';

import { watchGetCategoriesSaga } from './getCategories';
import { watchGetFavorites } from './getFavoriteTokens';
import watchGetMaxPriceSaga from './getMaxPrice';
import getNftsSaga from './getNfts';
import { watchGetTrendingTokens } from './getTrendingTokens';
import watchSearchNftsSaga from './searchNfts';

export default function* nftsSagas() {
  yield fork(watchSearchNftsSaga);
  yield fork(watchGetFavorites);
  yield fork(watchGetTrendingTokens);
  yield fork(getNftsSaga);
  yield fork(watchGetCategoriesSaga);
  yield fork(watchGetMaxPriceSaga);
}
