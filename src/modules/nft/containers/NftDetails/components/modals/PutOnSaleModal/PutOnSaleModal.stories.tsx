import React from 'react';
import { Box } from '@mui/material';

import { PutOnSaleModal } from './PutOnSaleModal';
import { putOnSaleModalPropsMocked } from './PutOnSaleModal.mock';

export default {
  title: 'components/nftActionModals/PutOnSaleModal',
  component: PutOnSaleModal,
};

export const Default: React.FC = () => (
  <Box>
    <PutOnSaleModal {...putOnSaleModalPropsMocked} />
  </Box>
);
