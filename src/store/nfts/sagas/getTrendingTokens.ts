import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getTrendingTokens } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftsState } from '../reducer';

export function* getTrendingTokensSaga({
  payload: { category },
}: {
  payload: ReturnType<typeof getTrendingTokens>['payload'];
}) {
  const { data: trendingTokens } = yield* call(baseApi.getTrendingTokens, category);
  yield* put(updateNftsState({ trendingTokens: camelize(trendingTokens) }));
}

export function* watchGetTrendingTokens() {
  yield* takeLatest(actionTypes.GET_TRENDING_TOKENS, wrap(getTrendingTokensSaga));
}
