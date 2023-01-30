import React from 'react';
import { Box } from '@mui/material';

import { BurnModal } from './BurnModal';
import { burnModalPropsMocked } from './BurnModal.mock';

export default {
  title: 'components/nftActionModals/BurnModal',
  component: BurnModal,
};

export const Default: React.FC = () => (
  <Box>
    <BurnModal {...burnModalPropsMocked} />
  </Box>
);
