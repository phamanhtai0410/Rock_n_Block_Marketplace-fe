import { call, put, select, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userSelector from 'store/user/selectors';
import { camelize } from 'utils';

import { getProfileInfobyId } from '../actions';
import actionTypes from '../actionTypes';
import { updateProfileState } from '../reducer';

export function* getProfileInfoByIdSaga({
  type,
  payload: { id, itemsPerPage },
}: ReturnType<typeof getProfileInfobyId>) {
  yield put(request(type));
  try {
    const user = yield select(userSelector.getProp('user'));

    if (Number(user.id) === Number(id)) {
      yield put(updateProfileState({ profile: user }));
    } else {
      const { data } = yield call(baseApi.getProfileInfoById, id);
      yield put(updateProfileState({ profile: camelize(data) }));
    }

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

function* updateProfileInfoSagaListener() {
  yield takeLatest(actionTypes.GET_PROFILE_INFO, getProfileInfoByIdSaga);
}

export default updateProfileInfoSagaListener;
