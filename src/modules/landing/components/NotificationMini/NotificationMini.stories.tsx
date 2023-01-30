import React from 'react';
import { Box } from '@mui/material';

import { NotificationMini, NotificationMiniSkeleton } from './NotificationMini';
import {
  notificationMiniPropsMockedBid,
  notificationMiniPropsMockedBuy,
  notificationMiniPropsMockedFollow,
  notificationMiniPropsMockedLike,
} from './NotificationMini.mock';

export default {
  title: 'components/Notifications',
};

export const Default: React.FC = () => (
  <Box
    padding={4}
    sx={{
      '& > *': {
        mb: 2,
      },
    }}
  >
    <NotificationMini {...notificationMiniPropsMockedLike} />
    <NotificationMini {...notificationMiniPropsMockedBid} />
    <NotificationMini {...notificationMiniPropsMockedBuy} />
    <NotificationMini {...notificationMiniPropsMockedFollow} />
    <NotificationMiniSkeleton />
  </Box>
);
