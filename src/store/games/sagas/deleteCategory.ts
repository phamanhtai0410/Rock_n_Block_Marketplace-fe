import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { deleteCategory } from 'store/games/actions';
import { getGameSaga } from 'store/games/sagas/getGame';
import { call, put, takeLatest } from 'typed-redux-saga';
import { ItemTypeVariant } from 'types';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* deleteCategorySaga({ type, payload: { id, params } }: ReturnType<typeof deleteCategory>) {
  yield* put(apiActions.request(type));
  try {
    const { data } = yield* call(baseApi.deleteGameItem, { itemType: ItemTypeVariant.category, id });

    getToastMessage('success', capitalizeFirstLetter(data));

    yield* call(getGameSaga, { type: actionTypes.GET_GAME, payload: params });

    yield* put(apiActions.success(type));
  } catch (err: any) {
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.DELETE_CATEGORY, deleteCategorySaga);
}
