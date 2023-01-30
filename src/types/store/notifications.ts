import { Activity } from 'types/api/Activity';

export type NotificationsState = {
  userNotifications: {
    total: number;
    resultsPerPage: number;
    totalPages: number;
    results: Activity[];
  };
  headerNotifications: Activity[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
};
