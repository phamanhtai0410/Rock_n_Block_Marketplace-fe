import React from 'react';
import { Box } from '@mui/material';

import { TransferModal } from './TransferModal';
import { transferModalPropsMocked } from './TransferModal.mock';

export default {
  title: 'components/nftActionModals/TransferModal',
  component: TransferModal,
};

export const Default: React.FC = () => (
  <Box>
    <TransferModal {...transferModalPropsMocked} />
  </Box>
);
