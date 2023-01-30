import { routes } from 'appConstants';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { addCategory } from 'store/games/actions';
import { put, takeLatest } from 'typed-redux-saga';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* addCategorySaga({ type, payload: { id, data, navigate, network } }: ReturnType<typeof addCategory>) {
  yield* put(apiActions.request(type));
  try {
    const { data: responseData } = yield baseApi.addCategory({ id, data, network });

    getToastMessage('success', capitalizeFirstLetter(responseData));

    navigate?.(routes.games.game.root.getPath(id, network));
    yield* put(apiActions.success(type));
  } catch (err: any) {
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.ADD_CATEGORY, addCategorySaga);
}
