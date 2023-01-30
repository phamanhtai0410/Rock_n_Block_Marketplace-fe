import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { getCategories } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftsState } from '../reducer';

export function* getCategoriesSaga({ payload }: { payload: ReturnType<typeof getCategories>['payload'] }) {
  const { data: categories } = yield* call(baseApi.getCategories);
  yield* put(updateNftsState({ categories: camelize(categories) }));
}

export function* watchGetCategoriesSaga() {
  yield* takeLatest(actionTypes.GET_CATEGORIES, wrap(getCategoriesSaga));
}
