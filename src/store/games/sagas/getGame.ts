import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getGame } from 'store/games/actions';
import { setGame } from 'store/games/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { GameCompanyType } from 'types';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';

export function* getGameSaga({ type, payload: { gameName, network } }: ReturnType<typeof getGame>) {
  yield* put(apiActions.request(type));
  try {
    const { data: gameData } = yield* call(baseApi.getGame, {
      gameName,
      network,
    });

    const camelizedGameData = camelize(gameData) as GameCompanyType;

    yield put(setGame(camelizedGameData));

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    // window.location.href = `${window.location.origin}/404`;
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_GAME, getGameSaga);
}
