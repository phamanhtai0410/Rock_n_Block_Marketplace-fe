import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowLeft } from 'components/Icon/components';

export default {
  title: 'theme/IconButton',
};

export const Default: React.FC = () => (
  <Box padding={4}>
    <Typography>Small - no paddings and backgrounds</Typography>
    <Box>
      <IconButton>
        <ArrowLeft />
      </IconButton>
      <IconButton disabled>
        <ArrowLeft />
      </IconButton>
      <IconButton className="border">
        <ArrowLeft />
      </IconButton>
      <IconButton className="border" disabled>
        <ArrowLeft />
      </IconButton>
      <IconButton className="borderHover">
        <ArrowLeft />
      </IconButton>
      <IconButton className="borderHover" disabled>
        <ArrowLeft />
      </IconButton>
      <IconButton className="square">
        <ArrowLeft />
      </IconButton>
    </Box>
    <Typography>Medium</Typography>
    <IconButton size="medium">
      <ArrowLeft />
    </IconButton>
    <Typography>Large</Typography>
    <IconButton size="large">
      <ArrowLeft />
    </IconButton>
  </Box>
);
