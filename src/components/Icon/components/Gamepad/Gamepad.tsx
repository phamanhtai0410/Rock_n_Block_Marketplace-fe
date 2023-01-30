import { FC } from 'react';
import { Box } from '@mui/material';
import { flexHelper } from 'utils';

import Image from './gamepad.png';

export const Gamepad: FC = (props) => (
  <Box {...props} sx={{ ...flexHelper() }}>
    <img src={Image} alt="gamepad" width={40} height={40} />
  </Box>
);
