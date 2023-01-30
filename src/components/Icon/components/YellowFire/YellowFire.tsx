import { FC } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import Image from './image.png';

interface IYellowFire {
  sx?: SxProps<Theme>;
}

export const YellowFire: FC<IYellowFire> = ({ sx }) => (
  <Box sx={{ ...sx }}>
    <img src={Image} alt="lightning" width={28} height={29} />
  </Box>
);
