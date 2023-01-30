import { FC } from 'react';
import { Box } from '@mui/material';
import { flexHelper } from 'utils';

import Image from './image.png';

export const YellowLightning: FC = (props) => (
  <Box {...props} sx={{ ...flexHelper() }}>
    <img src={Image} alt="lightning" width={14} height={34} />
  </Box>
);
