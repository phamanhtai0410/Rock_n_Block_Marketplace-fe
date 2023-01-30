import { FC } from 'react';
import { Box } from '@mui/material';
import { Lightning } from 'components/Icon/components';
import { COLOR_GRADIENT_PRIMARY, COLOR_WHITE } from 'theme/colors';
import { flexHelper } from 'utils';

export const PromotionChip: FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 10,
        background: COLOR_GRADIENT_PRIMARY,
        borderRadius: '50%',
        width: 32,
        height: 32,
        ...flexHelper(),
      }}
    >
      <Lightning sx={{ path: { fill: COLOR_WHITE }, ml: 1, mt: 0.5 }} />
    </Box>
  );
};
