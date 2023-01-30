import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { addCollections } from 'store/games/actions';
import { put, takeLatest } from 'typed-redux-saga';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* addCollectionsSaga({ type, payload }: ReturnType<typeof addCollections>) {
  yield* put(apiActions.request(type));
  try {
    const { data: response } = yield baseApi.addCollections(payload);

    getToastMessage('success', capitalizeFirstLetter(response));

    yield* put(apiActions.success(type));
  } catch (err: any) {
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.ADD_COLLECTIONS, addCollectionsSaga);
}
