import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { updateGame } from 'store/games/actions';
import { setGame } from 'store/games/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { GameCompanyType } from 'types';
import { camelize, snakeize } from 'utils';

import actionTypes from '../actionTypes';

export function* updateGameSaga({ type, payload: { gameName, data, network } }: ReturnType<typeof updateGame>) {
  yield* put(apiActions.request(type));

  try {
    const { data: gameData } = yield* call(baseApi.updateGame, {
      gameName,
      network,
      data: data instanceof FormData ? data : snakeize(data),
    });

    const camelizedGameData = camelize(gameData) as GameCompanyType;
    yield put(setGame(camelizedGameData));

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.UPDATE_GAME, updateGameSaga);
}
