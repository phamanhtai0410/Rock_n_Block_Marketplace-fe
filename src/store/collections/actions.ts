import { createAction } from '@reduxjs/toolkit';
import { CreateCollectionAction, EditFormFieldsAction } from 'types';
import { GetCollectionActivity, GetCollections, GetCollectionTradeData, Pagination, WithId } from 'types/requests';

import actionTypes from './actionTypes';

export const createCollection = createAction<CreateCollectionAction>(actionTypes.CREATE_COLLECTION);
export const editCollection = createAction<EditFormFieldsAction>(actionTypes.EDIT_COLLECTION);
export const getSingleCollection = createAction<WithId>(actionTypes.GET_SINGLE_COLLECTION);
export const getTopCollections = createAction<Pagination>(actionTypes.GET_TOP_COLLECTIONS);
export const getCollections = createAction<GetCollections>(actionTypes.GET_COLLECTIONS);
export const getMyCollections = createAction(actionTypes.GET_MY_COLLECTIONS);
export const getMaxRoyalty = createAction(actionTypes.GET_MAX_ROYALTY);
export const getTopCollectionPeriod = createAction(actionTypes.GET_TOP_COLLECTIONS_PERIOD);
export const getCollectionActivity = createAction<GetCollectionActivity>(actionTypes.GET_COLLECTION_ACTIVITY);
export const getCollectionTradeData = createAction<GetCollectionTradeData>(actionTypes.GET_COLLECTION_TRADE_DATA);
export const getCollectionChart = createAction<GetCollectionTradeData>(actionTypes.GET_COLLECTION_CHART);
