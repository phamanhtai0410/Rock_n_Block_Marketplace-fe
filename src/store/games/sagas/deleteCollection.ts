import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { deleteCollection } from 'store/games/actions';
import { getSubcategorySaga } from 'store/games/sagas/getSubcategory';
import { call, put, takeLatest } from 'typed-redux-saga';
import { ItemTypeVariant } from 'types';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* deleteCollectionSaga({ type, payload: { id, params } }: ReturnType<typeof deleteCollection>) {
  yield* put(apiActions.request(type));
  try {
    const { data } = yield* call(baseApi.deleteGameItem, { itemType: ItemTypeVariant.collection, id });

    getToastMessage('success', capitalizeFirstLetter(data));

    yield* call(getSubcategorySaga, { type: actionTypes.GET_SUBCATEGORY, payload: params });

    yield* put(apiActions.success(type));
  } catch (err: any) {
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.DELETE_COLLECTION, deleteCollectionSaga);
}
