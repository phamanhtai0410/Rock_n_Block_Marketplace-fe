import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getGames } from 'store/games/actions';
import { setGames, updateGamesState } from 'store/games/reducer';
import gamesSelectors from 'store/games/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { GameList } from 'types/store/games';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';

export function* getGamesSaga({
  type,
  payload: { shouldConcat, page, itemsPerPage, network },
}: ReturnType<typeof getGames>) {
  yield* put(apiActions.request(type));
  try {
    const storedGames = yield select(gamesSelectors.getProp('games'));
    const { data: games } = yield* call(baseApi.getGames, { itemsPerPage, page, network });

    const camelizedGameData = camelize(games) as GameList;

    if (shouldConcat) {
      yield* put(setGames([...(storedGames?.results || []), ...(camelizedGameData?.results || [])]));
    } else {
      yield put(updateGamesState({ games: camelizedGameData }));
    }

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_GAMES_DATA, getGamesSaga);
}
