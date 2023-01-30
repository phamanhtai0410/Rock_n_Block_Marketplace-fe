import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { editGame } from 'store/games/actions';
import { setGame } from 'store/games/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { GameCompanyType } from 'types';
import { camelize, capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* editGameSaga({ type, payload: { data, id, network } }: ReturnType<typeof editGame>) {
  yield* put(apiActions.request(type));
  try {
    const { data: gameData } = yield call(baseApi.editGame, { data, id, network });

    const camelizedGameData = camelize(gameData) as GameCompanyType;
    yield put(setGame(camelizedGameData));

    getToastMessage('success', 'Game has been updated');

    yield* put(apiActions.success(type));
  } catch (error: any) {
    console.error(error);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(error.cause.data)}`));
    yield* put(apiActions.error(type, error));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.EDIT_GAME, editGameSaga);
}
