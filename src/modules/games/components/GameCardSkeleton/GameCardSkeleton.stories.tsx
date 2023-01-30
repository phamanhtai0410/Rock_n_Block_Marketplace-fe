import React from 'react';
import { Box } from '@mui/material';

import { GameCardSkeleton } from './GameCardSkeleton';

export default {
  title: 'components/GameCardSkeleton',
  component: GameCardSkeleton,
};

export const Default: React.FC = () => (
  <Box style={{ maxWidth: 360 }}>
    <GameCardSkeleton />
  </Box>
);
