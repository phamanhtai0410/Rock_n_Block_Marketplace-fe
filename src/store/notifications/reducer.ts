import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsState } from 'types';
import { Activity } from 'types/api/Activity';

const initialState: NotificationsState = {
  userNotifications: {
    total: 0,
    totalPages: 0,
    resultsPerPage: 0,
    results: [],
  },
  headerNotifications: [],
  isEstablishingConnection: false,
  isConnected: false,
};

export const notificationsReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateHeaderNotifications: (state, action: PayloadAction<Activity[]>) => ({
      ...state,
      headerNotifications: action.payload,
    }),
    updateUserNotifications: (state, action: PayloadAction<NotificationsState['userNotifications']>) => ({
      ...state,
      userNotifications: action.payload,
    }),
    setInitialUserNotifications: (state) => ({
      ...state,
      userNotifications: initialState.userNotifications,
    }),
    startConnectingWS: (state) => {
      return {
        ...state,
        isEstablishingConnection: true,
      };
    },
    connectionEstablished: (state) => {
      return {
        ...state,
        isEstablishingConnection: true,
        isConnected: true,
      };
    },
    disconnectWS: (state) => {
      return {
        ...state,
        isEstablishingConnection: false,
        isConnected: false,
      };
    },
  },
});

export const {
  updateHeaderNotifications,
  setInitialUserNotifications,
  updateUserNotifications,
  startConnectingWS,
  connectionEstablished,
  disconnectWS,
} = notificationsReducer.actions;

export default notificationsReducer.reducer;
