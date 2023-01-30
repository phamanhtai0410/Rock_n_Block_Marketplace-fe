import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getCategory } from 'store/games/actions';
import { setCategory } from 'store/games/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { GameCategoryType } from 'types';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';

export function* getCategorySaga({ type, payload }: ReturnType<typeof getCategory>) {
  yield* put(apiActions.request(type));
  try {
    const { data: categoryData } = yield* call(baseApi.getCategory, payload);

    const camelizedCategoryData = camelize(categoryData) as GameCategoryType;

    yield put(setCategory(camelizedCategoryData));

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_CATEGORY, getCategorySaga);
}
