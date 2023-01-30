import type { NotificationsState, State } from 'types';

const notificationsSelectors = {
  getNotifications: (state: State): NotificationsState => state.notifications,
  getProp: (propKey: keyof NotificationsState) => (state: State) => state.notifications[propKey],
};

export default notificationsSelectors;
