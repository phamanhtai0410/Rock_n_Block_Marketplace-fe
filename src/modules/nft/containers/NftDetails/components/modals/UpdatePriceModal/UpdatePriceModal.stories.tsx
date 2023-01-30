import React from 'react';
import { Box } from '@mui/material';

import { UpdatePriceModal } from './UpdatePriceModal';
import { updatePriceModalPropsMocked } from './UpdatePriceModal.mock';

export default {
  title: 'components/nftActionModals/UpdatePriceModal',
  component: UpdatePriceModal,
};

export const Default: React.FC = () => (
  <Box>
    <UpdatePriceModal {...updatePriceModalPropsMocked} />
  </Box>
);
