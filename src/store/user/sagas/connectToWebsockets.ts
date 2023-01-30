import { call, put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { startConnectingWS } from 'store/notifications/reducer';

import { connectToWebsocket } from '../actions';
import actionTypes from '../actionTypes';

export function* connectToWebsocketSaga({ type }: ReturnType<typeof connectToWebsocket>) {
  yield put(apiActions.request(type));
  try {
    const { data: token } = yield call(baseApi.getWsToken);

    yield put({ type: startConnectingWS.type, payload: { token } });

    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CONNECT_TO_WEBSOCKET, connectToWebsocketSaga);
}
