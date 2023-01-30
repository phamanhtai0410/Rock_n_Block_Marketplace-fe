import { ethMaskAddress, isProduction } from 'appConstants';
import BigNumber from 'bignumber.js';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userActionTypes from 'store/user/actionTypes';
import { approveSaga } from 'store/user/sagas/approve';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';
import { getContractDataByItsName, toDecimals } from 'utils';

import { bid } from '../actions';
import actionTypes from '../actionTypes';

import { getNftDataSaga } from './getNftData';

export function* bidSaga({ type, payload }: ReturnType<typeof bid>) {
  const { data: requestData, web3Provider, tokenAddress, decimals } = payload;
  const { network } = yield select(userSelector.getUser);
  yield put(apiActions.request(type));

  yield put(
    setActiveModal({
      activeModal: Modals.SendPending,
      open: true,
    }),
  );
  try {
    const exchangeAddress = getContractDataByItsName(ContractsNames.exchange, isProduction, network)[1];

    if (tokenAddress !== ethMaskAddress) {
      const tokenAmount = new BigNumber(toDecimals(requestData.amount, decimals));
      yield call(approveSaga, {
        type: userActionTypes.APPROVE,
        payload: {
          amount: tokenAmount.toString(),
          spender: exchangeAddress,
          tokenAddress,
          web3Provider,
        },
      });
    }

    yield call(baseApi.bid, requestData);

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id: requestData.tokenId,
        web3Provider,
      },
    });
  } catch (err) {
    yield put(apiActions.error(type, err));

    yield put(
      setActiveModal({
        activeModal: Modals.SendRejected,
        open: true,
        repeatCallback: () =>
          store.store.dispatch({
            type,
            payload,
          }),
      }),
    );
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BID, bidSaga);
}
