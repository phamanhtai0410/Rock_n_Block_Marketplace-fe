import { Action } from 'types';

export const request = <T = string, P = never>(defaultType: T, payload?: P) => ({
  type: `${defaultType}_REQUEST`,
  payload,
});

export const success = <T = string, P = never>(defaultType: T, payload?: P) => ({
  type: `${defaultType}_SUCCESS`,
  payload,
});

export const error = <T = string, E = never>(defaultType: T, err?: E) => ({
  type: `${defaultType}_ERROR`,
  payload: err,
  err,
});

export const reset = <T = string>(defaultType: T) => ({
  type: `${defaultType}_RESET`,
});

export default {
  request,
  success,
  error,
  reset,
};

export type ApiAction = Action<'CONNECT_TO_WS'>;
export type WsActionTypes =
  | 'WS_CONNECT'
  | 'WS_DISCONNECT'
  | 'WS_CONNECTED'
  | 'WS_DISCONNECTED'
  | 'WS_MESSAGE'
  | 'WS_SEND_MESSAGE';

export const WS_TYPES: { [key in WsActionTypes]: WsActionTypes } = {
  WS_CONNECT: 'WS_CONNECT',
  WS_DISCONNECT: 'WS_DISCONNECT',
  WS_CONNECTED: 'WS_CONNECTED',
  WS_DISCONNECTED: 'WS_DISCONNECTED',
  WS_MESSAGE: 'WS_MESSAGE',
  WS_SEND_MESSAGE: 'WS_SEND_MESSAGE',
};
