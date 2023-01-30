import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { updateSingleProfile } from 'store/profile/reducer';
import { call, put, takeLatest } from 'typed-redux-saga';
import { camelize } from 'utils';

import { updateUserCover } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserProfileState } from '../reducer';

export function* updateUserCoverSaga({ type, payload }: ReturnType<typeof updateUserCover>) {
  yield* put(request(type));
  try {
    const { data: updatedData } = yield* call(baseApi.updateSelfCover, payload);
    yield* put(updateUserProfileState(camelize({ cover: updatedData })));
    yield* put(updateSingleProfile(camelize({ cover: updatedData })));

    yield* put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.UPDATE_USER_COVER, updateUserCoverSaga);
}
