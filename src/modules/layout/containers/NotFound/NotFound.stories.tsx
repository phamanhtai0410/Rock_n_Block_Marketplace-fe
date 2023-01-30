import React from 'react';
import { Box } from '@mui/material';

import { NotFound } from './NotFound';

export default {
  title: 'components/NotFoundPage',
  component: NotFound,
};

export const Default: React.FC = () => (
  <Box>
    <NotFound />
  </Box>
);
