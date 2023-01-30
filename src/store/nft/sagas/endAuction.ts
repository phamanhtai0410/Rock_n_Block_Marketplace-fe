import { call, put, select, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { Modals, UserState } from 'types';

import { endAuction } from '../actions';
import actionTypes from '../actionTypes';

import { getNftDataSaga } from './getNftData';

export function* endAuctionSaga({ type, payload }: ReturnType<typeof endAuction>) {
  yield put(apiActions.request(type));

  const { id, web3Provider } = payload;

  const {
    address,
    user: { url },
  }: UserState = yield select(userSelector.getUser);

  yield put(
    setActiveModal({
      activeModal: Modals.SendPending,
      open: true,
    }),
  );

  try {
    const { data } = yield call(baseApi.endAuction, { id });

    const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: address,
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

    yield call(baseApi.buyReject, {
      id: payload.id,
      owner: url,
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
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.END_AUCTION, endAuctionSaga);
}
