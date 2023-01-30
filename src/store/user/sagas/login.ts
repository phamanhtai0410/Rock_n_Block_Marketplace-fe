/* eslint-disable max-len */
import { call, put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { WalletProviders } from 'types';
import { getToastMessage, shortenPhrase } from 'utils';

import { login } from '../actions';
import actionTypes from '../actionTypes';
import { disconnectWalletState, updateUserState } from '../reducer';

export function* loginSaga({ type, payload: { address, web3Provider, provider, network } }: ReturnType<typeof login>) {
  yield put(apiActions.request(type));
  try {
    const { data: metamaskMessage } = yield call(baseApi.getMetamaskMessage, address);
    const signedMessage = yield call(web3Provider.eth.personal.sign, metamaskMessage, address, '');

    const {
      data: { token },
    } = yield call(baseApi.metamaskLogin, {
      address,
      signedMsg: signedMessage,
    });

    yield put(
      updateUserState({
        address,
        key: token,
        provider: provider as WalletProviders,
        network,
      }),
    );

    getToastMessage('success', `Wallet connected: ${shortenPhrase(address, 5, 5)}`);

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
    getToastMessage('error', `Something went wrong, try again or contact support`);
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}
