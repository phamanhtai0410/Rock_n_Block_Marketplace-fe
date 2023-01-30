/* eslint-disable max-len */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';

import { burn } from '../actions';
import actionTypes from '../actionTypes';

import { getNftDataSaga } from './getNftData';

export function* burnSaga({ type, payload }: ReturnType<typeof burn>) {
  yield put(apiActions.request(type));
  const { id, amount, web3Provider } = payload;
  const myAddress: string = yield select(userSelector.getProp('address'));

  yield put(
    setActiveModal({
      activeModal: Modals.SendPending,
      open: true,
    }),
  );
  try {
    const { data } = yield call(baseApi.burn, { id, amount });

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
  yield takeLatest(actionTypes.BURN, burnSaga);
}
