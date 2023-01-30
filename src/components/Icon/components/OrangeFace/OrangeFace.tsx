import { FC } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { flexHelper } from 'utils';

import Image from './image.png';

export type OrangeFaceProps = {
  sx?: SxProps<Theme>;
};

export const OrangeFace: FC<OrangeFaceProps> = ({ sx }) => (
  <Box sx={{ ...flexHelper(), ...sx }}>
    <img src={Image} alt="lightning" width={36} height={36} />
  </Box>
);
