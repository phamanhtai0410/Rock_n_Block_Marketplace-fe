import { Optional } from 'types';
import { Activity } from 'types/api/Activity';
import { Method } from 'types/api/enums';

import { NftDetailsHistoryProps } from './components';

export type ActualPropertyType = {
  traitType: string;
  traitValue: string;
};

export const convertApiHistoryData = (history: Optional<Activity[]>): Pick<NftDetailsHistoryProps, 'history'> => {
  const updatedHistory = (history || []).map(
    ({ method, fromAddress, fromImage, fromId, toName, toId, price, currency, date, amount }) => ({
      type: method as Method,
      price,
      currency,
      timestamp: date as string,
      address: fromAddress,
      avatar: fromImage as string,
      id: fromId as string,
      newOwnerName: toName,
      newOwnerId: toId,
      amount,
    }),
  );
  return {
    history: updatedHistory,
  };
};
