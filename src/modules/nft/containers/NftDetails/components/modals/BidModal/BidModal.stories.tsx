import React from 'react';
import { Box } from '@mui/material';

import { BidModal } from './BidModal';
import { bidModalPropsMocked } from './BidModal.mock';

export default {
  title: 'components/nftActionModals/BidModal',
  component: BidModal,
};

export const Default: React.FC = () => (
  <Box>
    <BidModal {...bidModalPropsMocked} />
  </Box>
);
