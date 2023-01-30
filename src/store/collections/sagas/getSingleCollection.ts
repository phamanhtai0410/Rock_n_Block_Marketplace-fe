import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { ICollection } from 'types';
import { camelize } from 'utils/camelize';

import { getSingleCollection } from '../actions';
import actionTypes from '../actionTypes';
import { setSingleCollection } from '../reducer';

export function* getSingleCollectionSaga({ type, payload: { id } }: ReturnType<typeof getSingleCollection>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getSingleCollection, {
      id,
    });

    const camelizedResult = { ...camelize(data), properties: data.properties } as ICollection;

    yield put(setSingleCollection(camelizedResult));

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    window.location.href = `${window.location.origin}/404`;
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_SINGLE_COLLECTION, getSingleCollectionSaga);
}
