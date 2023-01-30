import { createAction } from '@reduxjs/toolkit';
import { GetHeaderNotificationsPayload, GetUserNotificationsPayload, ViewNotificationsPayload } from 'types/requests';

import actionTypes from './actionTypes';

export const getHeaderNotifications = createAction<GetHeaderNotificationsPayload>(actionTypes.GET_HEADER_NOTIFICATIONS);
export const getUserNotifications = createAction<GetUserNotificationsPayload>(actionTypes.GET_USER_NOTIFICATIONS);
export const viewNotification = createAction<ViewNotificationsPayload>(actionTypes.VIEW_NOTIFICATION);
