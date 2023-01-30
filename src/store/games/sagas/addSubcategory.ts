import { routes } from 'appConstants';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { addSubcategory } from 'store/games/actions';
import { put, takeLatest } from 'typed-redux-saga';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* addSubcategorySaga({
  type,
  payload: { data, network, gameId, categoryId, navigate },
}: ReturnType<typeof addSubcategory>) {
  yield* put(apiActions.request(type));
  try {
    const { data: responseData } = yield baseApi.addSubcategory({ data, gameId, categoryId, network });

    getToastMessage('success', capitalizeFirstLetter(responseData));
    navigate?.(routes.games.game.category.root.getPath({ gameId, categoryId, network }));

    yield* put(apiActions.success(type));
  } catch (err: any) {
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.ADD_SUBCATEGORY, addSubcategorySaga);
}
