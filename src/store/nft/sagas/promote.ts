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

import { promote } from '../actions';
import actionTypes from '../actionTypes';

export function* promoteSaga({ type, payload }: ReturnType<typeof promote>) {
  yield put(apiActions.request(type));

  try {
    const { data: promoteRequestData, web3Provider, tokenAddress, tokenAmount, decimals } = payload;
    const myAddress: string = yield select(userSelector.getProp('address'));
    const { network } = yield select(userSelector.getUser);

    const { data } = yield call(baseApi.promote, promoteRequestData);

    if (tokenAddress !== ethMaskAddress) {
      const promotionAddress = getContractDataByItsName(ContractsNames.promotion, isProduction, network)[1];
      const tokenAmountDecimals = new BigNumber(toDecimals(tokenAmount, decimals)).multipliedBy(1.1).toFixed(0);
      yield call(approveSaga, {
        type: userActionTypes.APPROVE,
        payload: {
          amount: tokenAmountDecimals,
          spender: promotionAddress,
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

    yield put(
      setActiveModal({
        activeModal: Modals.SendSuccess,
        open: true,
        txHash: transactionHash,
      }),
    );
  } catch (err) {
    console.log(err);
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
  yield takeLatest(actionTypes.PROMOTE, promoteSaga);
}
