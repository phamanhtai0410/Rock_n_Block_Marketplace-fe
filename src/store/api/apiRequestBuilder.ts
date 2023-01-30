import { gamesRequests } from 'store/api/gamesRequests';

import ajax from './ajax';
import { collectionsRequests } from './collectionsRequests';
import { nftRequests } from './nftRequests';
import { profileRequests } from './profileRequestBuilder';
import { userRequests } from './userRequests';

export const baseApi = {
  ...nftRequests(ajax),
  ...userRequests(ajax),
  ...collectionsRequests(ajax),
  ...profileRequests(ajax),
  ...gamesRequests(ajax),
};
