import { URL } from 'appConstants';
import { AxiosRequestConfig } from 'axios';
import { CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  CreateCollectionAction,
  EditFormFieldsAction,
  GetCollectionActivityAction,
  GetCollectionTradeDataAction,
} from 'types';
import { MintRejectReq } from 'types/requests';
import { snakeize } from 'utils';

export const collectionsRequests = (
  ajax: (config: AxiosRequestConfig) => Generator<SelectEffect | CallEffect | PutEffect>,
) => ({
  getMyCollections() {
    return ajax({
      method: 'get',
      url: URL.getMyCollections,
    });
  },
  createNewCollection({ collection, network }: CreateCollectionAction) {
    return ajax({
      method: 'POST',
      url: URL.createNewCollection,
      params: { network },
      data: collection,
    });
  },
  mintReject({ id, type, owner }: MintRejectReq) {
    return ajax({
      method: 'POST',
      url: URL.mintReject,
      data: { id, type, owner },
    });
  },
  getSingleCollection(data: { id: string | number }) {
    return ajax({
      method: 'GET',
      url: URL.getSingleCollection(data.id),
    });
  },
  editCollection({ data, id }: EditFormFieldsAction) {
    return ajax({
      method: 'patch',
      url: URL.editCollection(id),
      data,
    });
  },
  getConfig() {
    return ajax({
      method: 'get',
      url: URL.getConfig,
    });
  },
  getCollectionTradeData({ id, days }: GetCollectionTradeDataAction) {
    return ajax({
      method: 'get',
      url: URL.getCollectionTradeData(id),
      params: { days },
    });
  },
  getCollectionActivity({
    id,
    days,
    page,
    itemsPerPage = 8,
    showSales,
    showListings,
    showBids,
    showTransfers,
  }: GetCollectionActivityAction) {
    const eventType = [
      ...(showSales ? ['Sales'] : []),
      ...(showListings ? ['Listing'] : []),
      ...(showBids ? ['Bet'] : []),
      ...(showTransfers ? ['Transfer'] : []),
    ].join(',');

    return ajax({
      method: 'get',
      url: URL.getCollectionActivity(id),
      params: snakeize({
        days,
        page,
        itemsPerPage,
        ...(eventType && { type: eventType }),
      }),
    });
  },
  getCollectionChart({ id, days }: GetCollectionTradeDataAction) {
    return ajax({
      method: 'get',
      url: URL.getCollectionChart(id),
      params: { days },
    });
  },
});
