import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { Countdown } from './Countdown';
import { countdownPropsMocked } from './Countdown.mock';

export default {
  title: 'components/Countdown',
  component: Countdown,
};

export const Default: React.FC = () => (
  <Container>
    <Box>
      <Typography>Common countdown</Typography>
      <Countdown {...countdownPropsMocked} />
    </Box>
    <Box>
      <Typography>Nft card countdown</Typography>
      <Countdown {...countdownPropsMocked} isNftCard />
    </Box>
  </Container>
);
