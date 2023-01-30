import { baseApi } from 'store/api/apiRequestBuilder';
import { wrap } from 'store/utils';
import { call, put, takeLatest } from 'typed-redux-saga';
import { Network } from 'types/api/Network';
import { camelize } from 'utils';

import { getServiceFee } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getServiceFeeSaga({ payload }: ReturnType<typeof getServiceFee>) {
  const { data }: { data: Network } = yield* call(baseApi.getServiceFee, payload.network);
  const serviceFee = camelize<Network>(data).platformFeePercentage;
  yield* put(updateUserState({ serviceFee }));
}

export default function* watchGetHomeData() {
  yield* takeLatest(actionTypes.GET_SERVICE_FEE, wrap(getServiceFeeSaga));
}
