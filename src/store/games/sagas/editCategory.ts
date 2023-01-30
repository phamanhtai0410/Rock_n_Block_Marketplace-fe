import { routes } from 'appConstants';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { editCategory } from 'store/games/actions';
import { call, put, takeLatest } from 'typed-redux-saga';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* editCategorySaga({
  type,
  payload: { data, categoryId, gameId, network, navigate },
}: ReturnType<typeof editCategory>) {
  yield* put(apiActions.request(type));
  try {
    const { data: categoryData } = yield call(baseApi.editCategory, { data, gameId, categoryId, network });

    getToastMessage('success', 'Game has been updated');
    navigate?.(routes.games.game.root.getPath(gameId, network));

    yield* put(apiActions.success(type));
  } catch (error: any) {
    console.error(error);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(error.cause.data)}`));
    yield* put(apiActions.error(type, error));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.EDIT_CATEGORY, editCategorySaga);
}
