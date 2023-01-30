import { errorStatuses } from 'appConstants';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { call, put, takeLatest } from 'typed-redux-saga';
import { ICollection } from 'types';
import { camelize, getToastMessage } from 'utils';

import { editCollection } from '../actions';
import actionTypes from '../actionTypes';
import { setSingleCollection } from '../reducer';

export function* editCollectionSaga({ type, payload }: ReturnType<typeof editCollection>) {
  yield* put(apiActions.request(type));

  try {
    const { data, status } = yield call(baseApi.editCollection, payload);
    const camelizedCollectionData = camelize(data) as ICollection;

    if (errorStatuses.includes(status)) {
      throw new Error();
    }

    yield put(setSingleCollection(camelizedCollectionData));
    getToastMessage('success', 'Collection has been updated');

    yield* put(apiActions.success(type));
  } catch (error) {
    getToastMessage('error', 'Something went wrong');
    console.error(error);
    yield* put(apiActions.error(type, error));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.EDIT_COLLECTION, editCollectionSaga);
}
