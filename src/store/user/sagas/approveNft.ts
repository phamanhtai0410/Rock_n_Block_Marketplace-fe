import { call, put, select, takeLatest } from 'redux-saga/effects';
import { collection1155Abi } from 'services/WalletService/config/abi';
import apiActions from 'store/api/actions';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';
import { Collection1155Abi } from 'types/contracts';
import { AbiItem } from 'web3-utils';

import { approveNft } from '../actions';
import actionTypes from '../actionTypes';

export function* approveNftSaga({ type, payload }: ReturnType<typeof approveNft>) {
  yield put(apiActions.request(type));

  const { operator, approved, tokenAddress, web3Provider } = payload;

  const myAddress: string = yield select(userSelector.getProp('address'));
  try {
    const collectionContract: Collection1155Abi = yield new web3Provider.eth.Contract(
      collection1155Abi as AbiItem[],
      tokenAddress,
    );

    const isApprovedForAll: boolean = yield call(collectionContract.methods.isApprovedForAll(myAddress, operator).call);

    if (!isApprovedForAll) {
      yield put(
        setActiveModal({
          activeModal: Modals.ApprovePending,
          open: true,
        }),
      );

      yield call(collectionContract.methods.setApprovalForAll(operator, approved).send, {
        from: myAddress,
      });

      yield put(
        setActiveModal({
          activeModal: Modals.init,
          open: false,
        }),
      );
    }

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(
      setActiveModal({
        activeModal: Modals.ApproveRejected,
        open: true,
        repeatCallback: () => {
          store.store.dispatch({
            type,
            payload,
          });
        },
      }),
    );
    yield put(apiActions.error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE_NFT, approveNftSaga);
}
