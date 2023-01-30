/* eslint-disable max-len */
import { ETH_ADDRESS, ethMaskAddress } from 'appConstants';
import { sortBy } from 'lodash';
import { erc20Abi } from 'services/WalletService/config/abi';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { all, call, put, select, takeLatest } from 'typed-redux-saga';
import { Currency } from 'types/api/Currency';
import { Erc20Abi } from 'types/contracts';
import { camelize, fromDecimals, getAreEqualAddresses } from 'utils';
import { AbiItem } from 'web3-utils';

import { getRates } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';
import userSelector from '../selectors';

export function* getRatesSaga({ type, payload: { web3Provider } }: ReturnType<typeof getRates>) {
  yield put(apiActions.request(type));
  const { address: userAddress, network } = yield* select(userSelector.getUser);

  try {
    const { data: allRates } = yield call(baseApi.getRates);
    yield put(updateUserState({ tokens: camelize<Currency[]>(sortBy(allRates, (rate) => rate.network)) }));

    const { data } = yield call(baseApi.getRates, network);
    let rates = camelize<Currency[]>(data);

    yield put(apiActions.success(type));
    let tokenBalancesData: (string | undefined)[][] = [];
    if (userAddress.length) {
      tokenBalancesData = yield* all(
        rates.map((token) => {
          if (!getAreEqualAddresses(token.address, ETH_ADDRESS)) {
            const tokenContract: Erc20Abi = new web3Provider.eth.Contract(erc20Abi as AbiItem[], token.address) as any;
            return all([
              call(() => token.address),
              call(tokenContract.methods.balanceOf(userAddress).call),
              call(tokenContract.methods.decimals().call),
            ]);
          }
          return all([call(() => ethMaskAddress), call(web3Provider.eth.getBalance, userAddress), call(() => '18')]);
        }),
      );
      rates = rates.map((_, index) => {
        const balance = Number(tokenBalancesData[index][1]);
        const decimals = Number(tokenBalancesData[index][2]);
        return {
          ...rates[index],
          userBalance: fromDecimals(balance, decimals),
          decimals,
        };
      });
    }

    yield put(
      updateUserState({
        tokenData: rates,
      }),
    );
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_RATES, getRatesSaga);
}
