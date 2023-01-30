import { call, put, select, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';

import { transfer } from '../actions';
import actionTypes from '../actionTypes';

import { getNftDataSaga } from './getNftData';

export function* transferSaga({ type, payload }: ReturnType<typeof transfer>) {
  yield put(apiActions.request(type));

  const myAddress: string = yield select(userSelector.getProp('address'));

  const { id, amount, address: recipientAddress, web3Provider } = payload;

  yield put(
    setActiveModal({
      activeModal: Modals.SendPending,
      open: true,
    }),
  );

  try {
    const { data } = yield call(baseApi.transfer, { id, amount, address: recipientAddress });

    const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: myAddress,
    });

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id,
        web3Provider,
      },
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
  yield takeLatest(actionTypes.TRANSFER, transferSaga);
}
