import { call } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userSelector from 'store/user/selectors';
import { put, select, takeLatest } from 'typed-redux-saga';
import { Standard } from 'types/api/enums';
import { TokenFull } from 'types/api/TokenFull';
import { camelize } from 'utils';

import { getNftData } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftState } from '../reducer';

import { get1155NftBalance } from './get1155NftBalance';

export function* getNftDataSaga({ type, payload: { id, web3Provider } }: ReturnType<typeof getNftData>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getNftData, { id });

    const camelizedNftData = camelize<TokenFull>(data);

    let ownedTokenAmount = '';
    const myAddress: string = yield select(userSelector.getProp('address'));
    const { network } = yield select(userSelector.getUser);

    if (
      camelizedNftData.standard === Standard.ERC1155 &&
      myAddress !== '' &&
      camelizedNftData.internalId !== undefined &&
      camelizedNftData.collection.address
    ) {
      ownedTokenAmount = yield call(get1155NftBalance, {
        web3Provider,
        tokenId: camelizedNftData.internalId,
        collectionAddress: camelizedNftData.collection.address,
        userAddress: myAddress,
        network,
      });
    }

    yield put(
      updateNftState({
        nft: camelizedNftData,
        ownedTokenAmount,
      }),
    );

    yield* put(apiActions.success(type));
  } catch (error) {
    console.error(error);
    yield* put(apiActions.error(type, error));
    window.location.href = `${window.location.origin}/404`;
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_NFT_DATA, getNftDataSaga);
}
