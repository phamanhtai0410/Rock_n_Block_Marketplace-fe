import { validStatuses } from 'appConstants';
import { call } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { subscribeMail } from 'store/user/actions';
import { put, takeEvery } from 'typed-redux-saga';
import { capitalizeFirstLetter, getToastMessage } from 'utils';

import actionTypes from '../actionTypes';

export function* subscribeMailSaga({ type, payload }: ReturnType<typeof subscribeMail>) {
  yield* put(apiActions.request(type));

  try {
    const { status } = yield call(baseApi.subscribeMail, payload);

    if (validStatuses.includes(status)) {
      getToastMessage('success', 'You successfully subscribed');
    }

    yield* put(apiActions.success(type));
  } catch (error: any) {
    console.error(error);
    getToastMessage('error', capitalizeFirstLetter(`${error.cause.data.email_address[0]}`));

    yield* put(apiActions.error(type, error));
  }
}

export default function* listener() {
  yield* takeEvery(actionTypes.SUBSCRIBE_MAIL, subscribeMailSaga);
}
