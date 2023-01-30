import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';

import actionTypes from '../actionTypes';
import { updateCollectionsState } from '../reducer';

export function* getMaxRoyaltySaga() {
  const { data } = yield* call(baseApi.getConfig);
  yield* put(updateCollectionsState({ maxRoyalty: +data.max_royalty_percentage }));
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_MAX_ROYALTY, wrap(getMaxRoyaltySaga));
}
