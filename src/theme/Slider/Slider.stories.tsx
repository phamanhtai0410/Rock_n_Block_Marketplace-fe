import React from 'react';
import { Box, Slider } from '@mui/material';

export default {
  title: 'theme/Slider',
};

const marks = [
  { value: 1, label: '0.001 $' },
  { value: 10000, label: '10000 $' },
];

export const Default: React.FC = () => (
  <Box sx={{ margin: '16px', width: '200px', height: '100px' }}>
    <Slider defaultValue={5000} min={0.01} max={10000} marks={marks} />
  </Box>
);
