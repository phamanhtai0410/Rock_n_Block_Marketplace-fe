/* eslint-disable max-len */
import { isProduction } from 'appConstants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userActions from 'store/user/actionTypes';
import { approveNftSaga } from 'store/user/sagas/approveNft';
import userSelector from 'store/user/selectors';
import { TokenFull } from 'types/api/TokenFull';
import { camelize, getContractDataByItsName } from 'utils';

import { setOnSale } from '../actions';
import actionTypes from '../actionTypes';
import { updateNftState } from '../reducer';

export function* setOnSaleSaga({
  type,
  payload: { id, data, web3Provider, tokenAddress, isUpdatePrice },
}: ReturnType<typeof setOnSale>) {
  yield put(apiActions.request(type));
  const { network } = yield select(userSelector.getUser);

  try {
    if (!isUpdatePrice && tokenAddress) {
      const exchangeAddress = getContractDataByItsName(ContractsNames.exchange, isProduction, network)[1];

      yield call(approveNftSaga, {
        type: userActions.APPROVE_NFT,
        payload: {
          web3Provider,
          operator: exchangeAddress,
          approved: true,
          tokenAddress,
        },
      });
    }

    const { data: tokenData } = yield call(baseApi.setOnSale, { id, data });

    const camelizedNftData = camelize<TokenFull>(tokenData);

    yield put(
      updateNftState({
        nft: camelizedNftData,
      }),
    );
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SET_ON_SALE, setOnSaleSaga);
}
