import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { deleteSubcategory } from 'store/games/actions';
import { getCategorySaga } from 'store/games/sagas/getCategory';
import { call, put, takeLatest } from 'typed-redux-saga';
import { ItemTypeVariant } from 'types';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* deleteSubcategorySaga({ type, payload: { id, params } }: ReturnType<typeof deleteSubcategory>) {
  yield* put(apiActions.request(type));
  try {
    const { data } = yield* call(baseApi.deleteGameItem, { itemType: ItemTypeVariant.subcategory, id });

    getToastMessage('success', capitalizeFirstLetter(data));

    yield* call(getCategorySaga, {
      type: actionTypes.GET_CATEGORY,
      payload: params,
    });

    yield* put(apiActions.success(type));
  } catch (err: any) {
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.DELETE_SUBCATEGORY, deleteSubcategorySaga);
}
