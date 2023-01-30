/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { TokenSlim } from 'types/api/TokenSlim';
import { camelize } from 'utils';

import { like } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftState } from '../reducer';

export function* getRelatedTokensSaga({ type, payload: { id } }: ReturnType<typeof like>) {
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.getRelatedTokens, { id });
    const camelizedRelatedTokens = camelize(data);

    yield put(
      updateNftState({
        relatedTokens: camelizedRelatedTokens as TokenSlim[],
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_RELATED_TOKENS, getRelatedTokensSaga);
}
