import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getFilterGames } from '../actions';
import actionTypes from '../actionTypes';
import { updateGamesState } from '../reducer';
import gamesSelectors from '../selectors';

export function* getFilterGamesSaga({
  payload: { text, page = 1, itemsPerPage = 8, network },
}: {
  payload: ReturnType<typeof getFilterGames>['payload'];
}) {
  const { filterGames: previousFilterGames } = yield* select(gamesSelectors.getGames);

  if (page === 1) {
    yield* put(
      updateGamesState({
        filterGames: [],
        totalFilterGamesPages: 1,
      }),
    );
  }

  const { data: games } = yield* call(baseApi.getGames, {
    orderBy: 'name',
    text,
    page,
    itemsPerPage,
    network,
  });

  const camelizedGames = camelize(games) as any;

  yield* put(
    updateGamesState({
      filterGames: [...(page > 1 ? previousFilterGames : []), ...(camelizedGames.results as any)],
      totalFilterGamesPages: camelizedGames.totalPages,
    }),
  );
}

export function* watchGetFilterGames() {
  yield* takeLatest(actionTypes.GET_FILTER_GAMES, wrap(getFilterGamesSaga));
}
