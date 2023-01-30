import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import nftSelectors from 'store/nfts/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { PaginateToken } from 'types/api/PaginateToken';
import { camelize } from 'utils';

import { getNfts } from '../actions';
import actionTypes from '../actionTypes';
import { setNfts, updateNftsState } from '../reducer';

export function* getNftsSaga({ type, payload: { requestData, shouldConcat } }: ReturnType<typeof getNfts>) {
  yield* put(apiActions.request(type));
  try {
    const { data: nfts } = yield call(baseApi.search, requestData);
    const myNfts: PaginateToken = yield select(nftSelectors.getProp('exploreNfts'));
    const camelizedNfts = camelize(nfts) as PaginateToken;

    if (shouldConcat) {
      yield* put(setNfts([...(myNfts?.results || []), ...(camelizedNfts?.results || [])]));
    } else {
      yield* put(updateNftsState({ exploreNfts: camelizedNfts }));
    }

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_NFTS, getNftsSaga);
}
