import { ethMaskAddress, isProduction } from 'appConstants';
import BigNumber from 'bignumber.js';
import { noop } from 'lodash';
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

import { buy } from '../actions';
import actionTypes from '../actionTypes';

import { getNftDataSaga } from './getNftData';

export function* buySaga({ type, payload }: ReturnType<typeof buy>) {
  const { data: requestData, web3Provider, tokenAddress, tokenPrice, decimals } = payload;
  yield put(apiActions.request(type));
  const { network } = yield select(userSelector.getUser);
  const myAddress: string = yield select(userSelector.getProp('address'));
  let trackTransactionCall = noop;
  try {
    const { data } = yield call(baseApi.buy, requestData);

    const exchangeAddress = getContractDataByItsName(ContractsNames.exchange, isProduction, network)[1];
    if (tokenAddress !== ethMaskAddress) {
      const tokenAmount = new BigNumber(toDecimals(tokenPrice, decimals)).multipliedBy(requestData.tokenAmount || 1);

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

    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
      }),
    );

    const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: myAddress,
    });

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id: requestData.id,
        web3Provider,
      },
    });
    trackTransactionCall = () =>
      baseApi.trackTransaction({
        txHash: transactionHash as string,
        token: Number(requestData.id),
        ownership: requestData.sellerId,
        ...(requestData.tokenAmount && {
          amount: requestData.tokenAmount,
        }),
      });

    yield put(
      setActiveModal({
        activeModal: Modals.SendSuccess,
        open: true,
        txHash: transactionHash,
      }),
    );
  } catch (err) {
    yield put(apiActions.error(type, err));

    yield call(baseApi.buyReject, {
      id: payload.data.id,
      owner: payload.data.sellerId,
    });

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
  } finally {
    yield call(trackTransactionCall);
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BUY, buySaga);
}
