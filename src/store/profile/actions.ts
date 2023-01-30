import { createAction } from '@reduxjs/toolkit';
import { GetProfileInfoByIdReq, GetProfileTabDataPayload } from 'types/requests';

import actionTypes from './actionTypes';

export const getProfileInfobyId = createAction<GetProfileInfoByIdReq>(actionTypes.GET_PROFILE_INFO);
export const getProfileTabData = createAction<GetProfileTabDataPayload>(actionTypes.GET_PROFILE_TAB_DATA);
