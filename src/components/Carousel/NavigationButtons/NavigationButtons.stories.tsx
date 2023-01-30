import React from 'react';
import { Box, Typography } from '@mui/material';

import { NavigationButtons } from './NavigationButtons';

export default {
  title: 'components/Carousel/NavigationButtons',
  component: NavigationButtons,
};

export const Default: React.FC = () => {
  return (
    <>
      <Typography variant="h6">Navigation Buttons</Typography>
      <Box mt={2}>
        <NavigationButtons />
      </Box>
    </>
  );
};
