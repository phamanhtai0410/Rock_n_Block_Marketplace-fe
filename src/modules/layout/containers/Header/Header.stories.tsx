import { Box } from '@mui/material';

import { Header } from './Header';

export default {
  title: 'components/Header',
};

export const Default = () => (
  <Box>
    <Header isLandingPage={false} />
  </Box>
);
