import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { listGame } from 'store/games/actions';
import { put, takeLatest } from 'typed-redux-saga';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* listGameSaga({ type, payload }: ReturnType<typeof listGame>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield baseApi.listGame(payload);

    getToastMessage('success', capitalizeFirstLetter(data));

    yield* put(apiActions.success(type));
  } catch (err: any) {
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.LIST_GAME, listGameSaga);
}
