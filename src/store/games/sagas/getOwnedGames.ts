import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getOwnedGames } from 'store/games/actions';
import { updateGamesState } from 'store/games/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { GameCompanyList } from 'types/api/GameCompanyList';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';

export function* getOwnedGamesSaga({ type, payload: { itemsPerPage, id, network } }: ReturnType<typeof getOwnedGames>) {
  yield* put(apiActions.request(type));
  try {
    const { data: ownedGames } = yield* call(baseApi.getOwnedGames, { userId: id, itemsPerPage, network });

    const camelizedOwnedGames = camelize(ownedGames.results) as GameCompanyList[];

    yield put(updateGamesState({ ownedGames: camelizedOwnedGames }));

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_OWNED_GAMES, getOwnedGamesSaga);
}
