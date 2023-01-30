import React from 'react';
import { Box } from '@mui/material';

import { AcceptBidModal } from './AcceptBidModal';
import { acceptBidModalPropsMocked } from './AcceptBidModal.mock';

export default {
  title: 'components/nftActionModals/AcceptBidModal',
  component: AcceptBidModal,
};

export const Default: React.FC = () => (
  <Box>
    <AcceptBidModal {...acceptBidModalPropsMocked} />
  </Box>
);
