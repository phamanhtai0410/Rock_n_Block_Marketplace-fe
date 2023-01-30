import { URL } from 'appConstants';
import { AxiosRequestConfig } from 'axios';
import { CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';

export const profileRequests = (
  ajax: (config: AxiosRequestConfig) => Generator<SelectEffect | CallEffect | PutEffect>,
) => ({
  getProfileInfoById(id: string | number) {
    return ajax({
      method: 'get',
      url: URL.getProfileInfoById(id),
    });
  },
});
