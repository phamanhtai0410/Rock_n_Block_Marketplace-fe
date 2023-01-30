import { URL } from 'appConstants';
import { AxiosRequestConfig } from 'axios';
import { CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
  AddCategoryReq,
  AddCollectionsReq,
  AddSubcategoryReq,
  DeleteGameItemReq,
  EditCategoryReq,
  EditGameReq,
  GetCategoryReq,
  GetFilterGames,
  GetGameReq,
  GetSubcategory,
  ListGameReq,
  Pagination,
  UpdateGameReq,
  WithQueryNetwork,
} from 'types';
import { snakeize } from 'utils';

export const gamesRequests = (
  ajax: (config: AxiosRequestConfig) => Generator<SelectEffect | CallEffect | PutEffect>,
) => ({
  getGames(params: GetFilterGames) {
    return ajax({
      method: 'get',
      url: URL.getGames,
      params: snakeize(params),
    });
  },
  editGame({ data, id, network }: EditGameReq) {
    return ajax({
      method: 'patch',
      url: URL.editGame(id, network),
      data: snakeize(data),
    });
  },
  listGame(data: ListGameReq) {
    return ajax({
      method: 'post',
      url: URL.listGame,
      data: snakeize(data),
    });
  },
  getGame({ gameName, network }: GetGameReq) {
    return ajax({
      method: 'get',
      url: URL.getGame(gameName, network),
    });
  },
  updateGame({ gameName, data, network }: UpdateGameReq) {
    return ajax({
      method: 'patch',
      url: URL.getGame(gameName, network),
      data,
    });
  },
  getCategory({ categoryId, gameId, network }: GetCategoryReq) {
    return ajax({
      method: 'get',
      url: URL.getCategory({ gameId, categoryId, network }),
    });
  },
  addCategory({ id, data, network }: AddCategoryReq) {
    return ajax({
      method: 'post',
      url: URL.addCategory(id, network),
      data: snakeize(data),
    });
  },
  editCategory({ gameId, categoryId, network, data }: EditCategoryReq) {
    return ajax({
      method: 'patch',
      url: URL.getCategory({ gameId, categoryId, network }),
      data: snakeize(data),
    });
  },
  addSubcategory({ gameId, categoryId, network, data }: AddSubcategoryReq) {
    return ajax({
      method: 'post',
      url: URL.addSubcategory({ gameId, categoryId, network }),
      data: snakeize(data),
    });
  },
  getSubcategory({ categoryId, gameId, subcategoryId, network }: GetSubcategory) {
    return ajax({
      method: 'get',
      url: URL.getSubcategory({ gameId, categoryId, subcategoryId, network }),
    });
  },
  addCollections({ categoryId, gameId, subcategoryId, network, data }: AddCollectionsReq) {
    return ajax({
      method: 'post',
      url: URL.addCollections({ gameId, categoryId, subcategoryId, network }),
      data: snakeize(data),
    });
  },
  deleteGameItem({ itemType, id }: DeleteGameItemReq) {
    return ajax({
      method: 'delete',
      url: URL.deleteGameItem({ itemType, id }),
    });
  },
  getOwnedGames(params: Pagination & Partial<WithQueryNetwork>) {
    return ajax({
      method: 'get',
      url: URL.getOwnedGames,
      params: snakeize(params),
    });
  },
});
