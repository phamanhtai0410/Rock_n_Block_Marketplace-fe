import { createAction } from '@reduxjs/toolkit';
import { GetMaxPrice, GetNftsPayload, GetTrendingTokensPayload, SearchNftsPayload } from 'types/requests';

import actionTypes from './actionTypes';

export const searchNfts = createAction<SearchNftsPayload>(actionTypes.SEARCH_NFTS);
export const getNfts = createAction<GetNftsPayload>(actionTypes.GET_NFTS);
export const getMaxPrice = createAction<GetMaxPrice>(actionTypes.GET_MAX_PRICE);

export const getCategories = createAction(actionTypes.GET_CATEGORIES);
export const getFavoriteTokens = createAction(actionTypes.GET_FAVORITE_TOKENS);
export const getTrendingTokens = createAction<GetTrendingTokensPayload>(actionTypes.GET_TRENDING_TOKENS);
