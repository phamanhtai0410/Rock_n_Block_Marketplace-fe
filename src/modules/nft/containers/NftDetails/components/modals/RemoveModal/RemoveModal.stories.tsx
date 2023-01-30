import React from 'react';
import { Box } from '@mui/material';

import { RemoveModal } from './RemoveModal';
import { removeModalPropsMocked } from './RemoveModal.mock';

export default {
  title: 'components/nftActionModals/RemoveModal',
  component: RemoveModal,
};

export const Default: React.FC = () => (
  <Box>
    <RemoveModal {...removeModalPropsMocked} />
  </Box>
);
