import { createAction } from '@reduxjs/toolkit';
import {
  AddCategoryReq,
  AddCollectionsReq,
  AddSubcategoryReq,
  DeleteGameReq,
  EditCategoryReq,
  EditGameReq,
  GetCategoryReq,
  GetFilterGames,
  GetGameReq,
  GetSubcategory,
  ListGameReq,
  Pagination,
  UpdateGameReq,
  WithId,
  WithQueryNetwork,
} from 'types';

import actionTypes from './actionTypes';

export const getGames = createAction<Pagination & Partial<WithQueryNetwork>>(actionTypes.GET_GAMES_DATA);
export const editGame = createAction<EditGameReq>(actionTypes.EDIT_GAME);
export const listGame = createAction<ListGameReq>(actionTypes.LIST_GAME);
export const getGame = createAction<GetGameReq>(actionTypes.GET_GAME);
export const updateGame = createAction<UpdateGameReq>(actionTypes.UPDATE_GAME);
export const getCategory = createAction<GetCategoryReq>(actionTypes.GET_CATEGORY);
export const addCategory = createAction<AddCategoryReq>(actionTypes.ADD_CATEGORY);
export const editCategory = createAction<EditCategoryReq>(actionTypes.EDIT_CATEGORY);
export const addSubcategory = createAction<AddSubcategoryReq>(actionTypes.ADD_SUBCATEGORY);
export const getSubcategory = createAction<GetSubcategory>(actionTypes.GET_SUBCATEGORY);
export const addCollections = createAction<AddCollectionsReq>(actionTypes.ADD_COLLECTIONS);
export const deleteCategory = createAction<DeleteGameReq>(actionTypes.DELETE_CATEGORY);
export const deleteSubcategory = createAction<DeleteGameReq>(actionTypes.DELETE_SUBCATEGORY);
export const deleteCollection = createAction<DeleteGameReq>(actionTypes.DELETE_COLLECTION);
export const getOwnedGames = createAction<Pagination & Partial<WithId & WithQueryNetwork>>(actionTypes.GET_OWNED_GAMES);
export const getFilterGames = createAction<GetFilterGames>(actionTypes.GET_FILTER_GAMES);
