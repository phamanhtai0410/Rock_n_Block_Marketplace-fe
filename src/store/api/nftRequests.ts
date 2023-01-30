import { URL } from 'appConstants';
import { AxiosRequestConfig } from 'axios';
import { CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  BidReq,
  BurnReq,
  BuyReject,
  BuyReq,
  GetMaxPrice,
  Pagination,
  PromoteReq,
  SearchNftReq,
  SetOnAuctionReq,
  SetOnSaleReq,
  TrackTransactionReq,
  TransferReq,
  WithId,
} from 'types/requests';
import { snakeize } from 'utils';

export const nftRequests = (
  ajax: (config: AxiosRequestConfig) => Generator<SelectEffect | CallEffect | PutEffect>,
) => ({
  getNftData({ id }: WithId) {
    return ajax({
      method: 'get',
      url: URL.getNftData(id),
    });
  },
  getRelatedTokens({ id }: WithId) {
    return ajax({
      method: 'get',
      url: URL.getRelatedTokens(id),
    });
  },
  getPromotionData() {
    return ajax({
      method: 'get',
      url: URL.promote,
    });
  },
  setOnSale({ data, id }: Omit<SetOnSaleReq, 'web3Provider' | 'tokenAddress'>) {
    return ajax({
      method: 'post',
      url: URL.setOnSale(id),
      data,
    });
  },
  setOnAuction({ data, id }: Omit<SetOnAuctionReq, 'web3Provider'>) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'post',
      url: URL.setOnAuction(id),
      data: snakeizedData,
    });
  },
  like({ id }: WithId) {
    return ajax({
      method: 'post',
      url: URL.like,
      data: {
        id,
      },
    });
  },
  removeFromSale({ id }: WithId) {
    return ajax({
      method: 'post',
      url: URL.removeFromSale(id),
    });
  },
  burn({ id, amount }: Omit<BurnReq, 'web3Provider'>) {
    return ajax({
      method: 'post',
      url: URL.burn(id),
      data: {
        amount: amount || 1,
      },
    });
  },
  transfer({ id, amount, address }: Omit<TransferReq, 'web3Provider'>) {
    return ajax({
      method: 'post',
      url: URL.transfer(id),
      data: {
        amount: amount || 1,
        address,
      },
    });
  },
  promote(data: PromoteReq['data']) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'post',
      url: URL.promote,
      data: snakeizedData,
    });
  },
  bid(data: BidReq['data']) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'post',
      url: URL.bid,
      data: snakeizedData,
    });
  },
  endAuction(data: { id: string }) {
    return ajax({
      method: 'post',
      url: URL.endAuction(data.id),
    });
  },
  buy(data: BuyReq['data']) {
    return ajax({
      method: 'post',
      url: URL.buy,
      data,
    });
  },
  buyReject(data: BuyReject) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'post',
      url: URL.buyReject,
      data: snakeizedData,
    });
  },
  trackTransaction(data: TrackTransactionReq) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'post',
      url: URL.trackTransaction,
      data: snakeizedData,
    });
  },
  search({ ...params }: SearchNftReq) {
    const snakeizedData = snakeize({ ...params });
    return ajax({
      method: 'get',
      url: URL.search,
      params: snakeizedData,
    });
  },
  presearch(query: string) {
    return ajax({
      method: 'get',
      url: URL.presearch,
      params: { presearch: query },
    });
  },

  getFavorites() {
    return ajax({
      method: 'get',
      url: URL.favorites,
    });
  },
  getCategories() {
    return ajax({
      method: 'get',
      url: URL.categories,
    });
  },
  getTrendingTokens(category: string) {
    return ajax({
      method: 'get',
      url: URL.trendingTokens,
      params: { category },
    });
  },
  getTopCollections(data: Pagination) {
    const snakeizedData = snakeize(data);
    return ajax({
      method: 'get',
      url: URL.topCollections,
      params: snakeizedData,
    });
  },
  createToken(data: FormData) {
    return ajax({
      method: 'post',
      url: URL.createToken,
      data,
    });
  },
  getMaxPrice(data: GetMaxPrice) {
    return ajax({
      method: 'get',
      url: URL.getMaxPrice,
      params: data,
    });
  },
});
