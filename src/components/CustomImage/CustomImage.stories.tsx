import React from 'react';
import { Box } from '@mui/material';

import { CustomImage } from './CustomImage';
import { customImagePropsMocked } from './CustomImage.mock';

export default {
  title: 'components/CustomImage',
  component: CustomImage,
};

export const Default: React.FC = () => (
  <Box>
    <CustomImage {...customImagePropsMocked} />
  </Box>
);
