import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getSubcategory } from 'store/games/actions';
import { updateGamesState } from 'store/games/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { GameSubcategoryType } from 'types';
import { camelize } from 'utils';

import actionTypes from '../actionTypes';

export function* getSubcategorySaga({ type, payload }: ReturnType<typeof getSubcategory>) {
  yield* put(apiActions.request(type));
  try {
    const { data: subcategoryData } = yield* call(baseApi.getSubcategory, payload);

    const camelizedSubctegoryData = camelize(subcategoryData) as GameSubcategoryType;

    yield put(
      updateGamesState({
        subcategory: camelizedSubctegoryData,
      }),
    );

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_SUBCATEGORY, getSubcategorySaga);
}
