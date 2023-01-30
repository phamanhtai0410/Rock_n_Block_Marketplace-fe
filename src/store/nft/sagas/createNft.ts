import { isProduction, routes } from 'appConstants';
import { call } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userActionTypes from 'store/user/actionTypes';
import { approveNftSaga } from 'store/user/sagas/approveNft';
import userSelector from 'store/user/selectors';
import { put, select, takeLatest } from 'typed-redux-saga';
import { Modals } from 'types';
import { NftVariantType } from 'types/requests';
import { getContractDataByItsName, getToastMessage } from 'utils';

import { createNft } from '../actions';
import actionTypes from '../actionTypes';

export function* createNftSaga({ type, payload }: ReturnType<typeof createNft>) {
  yield* put(apiActions.request(type));
  const {
    web3Provider,
    data: { dataForCreation, isListForSaleNow },
    tokenAddress,
    navigate,
  } = payload;
  const {
    address,
    user: { id },
    network,
  } = yield select(userSelector.getUser);
  const exchangeAddress = getContractDataByItsName(ContractsNames.exchange, isProduction, network)[1];

  try {
    if (isListForSaleNow) {
      yield call(approveNftSaga, {
        type: userActionTypes.APPROVE_NFT,
        payload: {
          web3Provider,
          operator: exchangeAddress,
          approved: true,
          tokenAddress: tokenAddress as string,
        },
      });
    }

    yield put(
      setActiveModal({
        activeModal: Modals.SendPending,
        open: true,
      }),
    );

    const response = yield call(baseApi.createToken, dataForCreation);

    if (response.status === 400) {
      getToastMessage('error', 'Token name is taken');
      yield put(
        setActiveModal({
          open: false,
        }),
      );
      return;
    }

    try {
      const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
        ...response.data.initial_tx,
        from: address,
      });

      yield put(
        setActiveModal({
          activeModal: Modals.MintSuccess,
          open: true,
          txHash: transactionHash,
          repeatCallback: undefined,
        }),
      );
      navigate?.(routes.profile.root.getPath(id));
    } catch (error) {
      yield call(baseApi.mintReject, {
        id: response.data.token.id as string,
        type: NftVariantType.token,
      });

      yield* put(apiActions.error(type, error));

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

    yield* put(apiActions.success(type));
  } catch (error) {
    console.error(error);
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.CREATE_NFT, createNftSaga);
}
