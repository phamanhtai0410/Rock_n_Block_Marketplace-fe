/* eslint-disable no-alert */
/* eslint-disable no-console */
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { connectToWebsocket } from 'store/user/actions';
import { State } from 'types';
import { Activity } from 'types/api/Activity';
import { camelize } from 'utils';

import {
  connectionEstablished,
  disconnectWS,
  startConnectingWS,
  updateHeaderNotifications,
  updateUserNotifications,
} from '../notifications/reducer';

const WS_PINGPONG_MS = 10000;

const websocketMiddleWare: Middleware = (store) => {
  let socket: WebSocket;
  let accessToken = '';

  let intervalID: NodeJS.Timeout;
  const pingPongInterval = () =>
    setInterval(() => {
      // if (socket && socket.readyState === 1) {
      //   socket.send(accessToken);
      // }
    }, WS_PINGPONG_MS);
  return (next) => (action: PayloadAction<any>) => {
    const isConnectionEstablished = socket && (store.getState() as State).notifications.isConnected;

    if (startConnectingWS.type === action.type) {
      socket = new WebSocket('wss://katanainu.rocknblock.io/ws/');
      accessToken = action?.payload?.token;
      store.dispatch(connectionEstablished());
      intervalID = pingPongInterval();
    }

    if (isConnectionEstablished) {
      socket.onopen = () => {
        socket.send(accessToken);
      };

      socket.onmessage = (event) => {
        const { headerNotifications } = (store.getState() as State).notifications;
        const { userNotifications } = (store.getState() as State).notifications;
        store.dispatch(
          updateHeaderNotifications([camelize(JSON.parse(event.data)) as Activity, ...headerNotifications]),
        );
        store.dispatch(
          updateUserNotifications({
            ...userNotifications,
            total: userNotifications.total + 1,
            results: [camelize(JSON.parse(event.data)) as Activity, ...userNotifications.results],
          }),
        );
      };

      socket.onclose = (event) => {
        if (event.wasClean) {
          console.log(`Connection is closed, code=${event.code} reaseon=${event.reason}`);
          store.dispatch(disconnectWS());
          clearInterval(intervalID);
        } else {
          console.log(`Connection is closed unclean`);
          store.dispatch(connectToWebsocket());
        }
      };

      socket.onerror = (error) => {
        console.log(error);
        store.dispatch(connectToWebsocket());
        clearInterval(intervalID);
      };
    }
    next(action);
  };
};

export default websocketMiddleWare;
