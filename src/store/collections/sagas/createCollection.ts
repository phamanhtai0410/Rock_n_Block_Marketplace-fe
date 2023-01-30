import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { Modals } from 'types';
import { NftVariantType } from 'types/requests';
import { getToastMessage } from 'utils';

import { createCollection } from '../actions';
import actionTypes from '../actionTypes';

export function* createCollectionSaga({ type, payload }: ReturnType<typeof createCollection>) {
  yield* put(apiActions.request(type));
  yield put(
    setActiveModal({
      activeModal: Modals.SendPending,
      open: true,
    }),
  );
  try {
    const { data } = yield call(baseApi.createNewCollection, payload);

    if (!data.initial_tx) {
      Object.values(data).forEach((err: any) => {
        getToastMessage('error', err);
      });

      yield put(
        setActiveModal({
          activeModal: Modals.init,
          open: false,
          txHash: '',
        }),
      );
      yield put(apiActions.error(type));
    } else {
      const address: string = yield select(userSelector.getProp('address'));
      try {
        const { transactionHash } = yield call(payload.web3.eth.sendTransaction, {
          ...data.initial_tx,
          from: address,
        });
        getToastMessage('success', 'Collection successfully created');
        yield put(
          setActiveModal({
            activeModal: Modals.SendSuccess,
            open: true,
            txHash: transactionHash,
          }),
        );
        yield put(apiActions.success(type));
      } catch (err) {
        console.error(err);
        yield call(baseApi.mintReject, {
          id: data.collection.url || 0,
          type: NftVariantType.collection,
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
        yield put(apiActions.error(type, err));
      }
    }
  } catch (err) {
    console.error(err);
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
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.CREATE_COLLECTION, createCollectionSaga);
}
