import { URL } from 'appConstants';
import { AxiosRequestConfig } from 'axios';
import { omit } from 'lodash';
import { IFormInputs } from 'modules/profile/pages/EditProfile';
import { CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  EmailSubscPayload,
  GetUserNotificationsPayload,
  LoginReq,
  UpdateUserCoverPayload,
  ViewNotificationsPayload,
} from 'types/requests';
import { snakeize } from 'utils/camelize';

export const userRequests = (
  ajax: (config: AxiosRequestConfig) => Generator<SelectEffect | CallEffect | PutEffect>,
) => ({
  getMetamaskMessage(address: string) {
    return ajax({
      method: 'get',
      url: URL.getMetamaskMessage(address),
    });
  },
  getWsToken() {
    return ajax({
      method: 'get',
      url: URL.getWsToken,
    });
  },
  metamaskLogin(data: Omit<LoginReq, 'web3Provider'>) {
    return ajax({
      method: 'post',
      url: URL.metamaskLogin,
      data: snakeize(data),
    });
  },
  getSelfInfo() {
    return ajax({
      method: 'get',
      url: URL.getSelfInfo,
    });
  },

  getRates(network = '') {
    return ajax({
      method: 'get',
      url: URL.rates,
      params: { network },
    });
  },
  follow(id: string | number) {
    return ajax({
      method: 'post',
      url: URL.follow,
      data: { id },
    });
  },
  unFollow(id: string | number) {
    return ajax({
      method: 'post',
      url: URL.unFollow,
      data: { id },
    });
  },

  updateSelfCover(data: UpdateUserCoverPayload) {
    const formData = new FormData();
    if (data.cover) {
      formData.append('cover', data.cover);
    }

    return ajax({
      method: 'post',
      url: URL.setSelfCover,
      data: data.cover ? formData : data,
    });
  },

  updateSelfInfo(data: IFormInputs) {
    const formData = new FormData();
    Object.entries(snakeize(data)).forEach(([key, value]: [string, any]) => {
      formData.append(key, value);
    });
    if (data.avatar) {
      formData.set('avatar', data.avatar);
    }
    if (data.cover) {
      formData.set('cover', data?.cover);
    }

    return ajax({
      method: 'patch',
      url: URL.getSelfInfo,
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
    });
  },

  getFollowers(id: number | string) {
    return ajax({
      method: 'get',
      url: URL.followers(id),
    });
  },
  getFollowing(id: number | string) {
    return ajax({
      method: 'get',
      url: URL.following(id),
    });
  },

  getTopUsers() {
    return ajax({
      method: 'get',
      url: URL.getTopUsers,
    });
  },

  getHeaderNotifications() {
    return ajax({
      method: 'get',
      url: URL.notifications,
    });
  },

  getUserNotifications(data: GetUserNotificationsPayload) {
    const snakeizedData = snakeize(omit(data, 'address'));
    return ajax({
      method: 'get',
      url: URL.getUserNotifications(data.address),
      params: snakeizedData,
    });
  },

  getUserFollowersNotifications(data: GetUserNotificationsPayload) {
    const snakeizedData = snakeize(omit(data, 'address'));
    return ajax({
      method: 'get',
      url: URL.getUserFollowersNotifications(data.address),
      params: snakeizedData,
    });
  },

  viewNotification(data: ViewNotificationsPayload) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'post',
      url: URL.notifications,
      data: snakeizedData,
    });
  },
  getServiceFee(network: string) {
    return ajax({
      method: 'get',
      url: URL.getNetworkInfo(network),
    });
  },
  subscribeMail(data: EmailSubscPayload) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'post',
      url: URL.mailSubscribe,
      data: snakeizedData,
    });
  },
});
