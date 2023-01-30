/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { PromotionSettings } from 'types/api/PromotionSettings';
import { camelize } from 'utils';

import { getPromotionData } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftState } from '../reducer';

export function* getPromotionDataSaga({ type }: ReturnType<typeof getPromotionData>) {
  yield put(apiActions.request(type));
  try {
    const { data } = yield call(baseApi.getPromotionData);
    const camelizedPromotionData = camelize(data);

    yield put(
      updateNftState({
        promotion: camelizedPromotionData as PromotionSettings[],
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_PROMOTION_DATA, getPromotionDataSaga);
}
