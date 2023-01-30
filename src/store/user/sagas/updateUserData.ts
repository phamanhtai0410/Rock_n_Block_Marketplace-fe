import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { updateProfileState } from 'store/profile/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize, capitalizeFirstLetter, getToastMessage } from 'utils';

import { updateUserData } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserProfileState } from '../reducer';

export function* updateUserDataSaga({ type, payload: data }: ReturnType<typeof updateUserData>) {
  yield* put(request(type));

  try {
    const { data: updatedData } = yield* call(baseApi.updateSelfInfo, data);
    yield* put(updateUserProfileState(camelize(updatedData)));
    yield* put(updateProfileState({ profile: camelize(updatedData) }));

    yield* put(success(type));
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', capitalizeFirstLetter(`${Object.values(err.cause.data)}`));
    yield* put(error(type));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.UPDATE_USER_DATA, updateUserDataSaga);
}
