import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { searchNfts } from '../actions';
import actionTypes from '../actionTypes';
import { updatePresearchNfts } from '../reducer';

export function* searchNftsSaga({ type, payload: { query } }: ReturnType<typeof searchNfts>) {
  const { data } = yield* call(baseApi.presearch, query);

  yield* put(updatePresearchNfts(camelize(data)));
}

export default function* listener() {
  yield* takeLatest(actionTypes.SEARCH_NFTS, wrap(searchNftsSaga));
}
