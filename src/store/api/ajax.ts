import { baseURL, errorStatuses } from 'appConstants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { disconnectWalletState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';
import { validateStatus } from 'utils/validateStatus';

const client: AxiosInstance = axios.create({
  baseURL,
  validateStatus,
});

export default function* ajax(config: AxiosRequestConfig): Generator<SelectEffect | CallEffect | PutEffect> {
  const accessToken = yield select(userSelector.getProp('key'));

  if (accessToken) {
    client.defaults.headers.common.Authorization = `Token ${accessToken}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = yield call<(configVar: AxiosRequestConfig) => Promise<AxiosResponse>>(client, config);

  if (accessToken && response.status === 401) {
    // if key has been expired, then un-login + disconnect
    yield put(disconnectWalletState());
  }

  if (errorStatuses.includes(response.status)) {
    throw new Error('Bad response', { cause: response });
  }

  return response;
}
