/* eslint-disable max-len */
import { isProduction } from 'appConstants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userActions from 'store/user/actionTypes';
import { approveNftSaga } from 'store/user/sagas/approveNft';
import userSelector from 'store/user/selectors';
import { getContractDataByItsName } from 'utils';

import { setOnAuction } from '../actions';
import actionTypes from '../actionTypes';

import { getNftDataSaga } from './getNftData';

export function* setOnAuctionSaga({
  type,
  payload: { id, data, web3Provider, tokenAddress },
}: ReturnType<typeof setOnAuction>) {
  yield put(apiActions.request(type));
  const { network } = yield select(userSelector.getUser);

  try {
    const exchangeAddress = getContractDataByItsName(ContractsNames.exchange, isProduction, network)[1];

    yield call(approveNftSaga, {
      type: userActions.APPROVE_NFT,
      payload: {
        web3Provider,
        operator: exchangeAddress,
        approved: true,
        tokenAddress: tokenAddress as string,
      },
    });
    yield call(baseApi.setOnAuction, { id, data });

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id,
        web3Provider,
      },
    });
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SET_ON_AUCTION, setOnAuctionSaga);
}
