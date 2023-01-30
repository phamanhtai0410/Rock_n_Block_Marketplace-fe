import { noop } from 'lodash';
import { Method } from 'types/api/enums';

import { NotificationMiniProps } from './NotificationMini';

export const notificationMiniPropsMockedLike: NotificationMiniProps = {
  isSeen: false,
  name: 'John',
  type: Method.like,
  buyBidAmount: '100',
  timestamp: '1660903307',
  avatar: '',
  currency: 'ETH',
  notificationId: 0,
  onViewNotification: noop,
};

export const notificationMiniPropsMockedBid: NotificationMiniProps = {
  isSeen: true,
  name: 'John',
  type: Method.Bet,
  buyBidAmount: '100',
  timestamp: '1660903307',
  avatar: '',
  currency: 'ETH',
  notificationId: 0,
  onViewNotification: noop,
};

export const notificationMiniPropsMockedBuy: NotificationMiniProps = {
  isSeen: false,
  name: 'John',
  type: Method.Buy,
  buyBidAmount: '100',
  timestamp: '1660903307',
  avatar: '',
  currency: 'ETH',
  notificationId: 0,
  onViewNotification: noop,
};

export const notificationMiniPropsMockedFollow: NotificationMiniProps = {
  isSeen: true,
  name: 'John',
  type: Method.follow,
  buyBidAmount: '100',
  timestamp: '1660903307',
  avatar: '',
  currency: 'ETH',
  notificationId: 0,
  onViewNotification: noop,
};
