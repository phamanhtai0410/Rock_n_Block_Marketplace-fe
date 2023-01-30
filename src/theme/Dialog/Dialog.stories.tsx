import React from 'react';
import { Dialog, Typography } from '@mui/material';

export default {
  title: 'theme/Dialog',
};

export const Default: React.FC = () => (
  <Dialog open title="123">
    <Typography>MODAL</Typography>
  </Dialog>
);
