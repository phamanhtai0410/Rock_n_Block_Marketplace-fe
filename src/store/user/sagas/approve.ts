import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { erc20Abi } from 'services/WalletService/config/abi';
import apiActions from 'store/api/actions';
import store from 'store/configureStore';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';
import { AbiItem } from 'web3-utils';

import { approve } from '../actions';
import actionTypes from '../actionTypes';

export function* approveSaga({ type, payload }: ReturnType<typeof approve>) {
  const { amount, spender, tokenAddress, web3Provider, isMax } = payload;
  yield put(apiActions.request(type));

  const myAddress: string = yield select(userSelector.getProp('address'));
  try {
    yield put(
      setActiveModal({
        activeModal: Modals.ApprovePending,
        open: true,
      }),
    );

    const tokenContract: ContractWeb3 = yield new web3Provider.eth.Contract(erc20Abi as AbiItem[], tokenAddress);

    const allowance: string = yield call(tokenContract.methods.allowance(myAddress, spender).call);

    if (new BigNumber(allowance).isLessThan(amount)) {
      const formattedAmount = new BigNumber(amount).plus(new BigNumber(allowance)).toFixed();
      yield call(
        tokenContract.methods.approve(spender, isMax ? (amount as BigNumber).toFixed() : formattedAmount).send,
        {
          from: myAddress,
        },
      );
      yield put(apiActions.success(type));
    }

    yield put(
      setActiveModal({
        activeModal: Modals.init,
        open: false,
      }),
    );
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
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
