import { FC } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { COLOR_LIGHT_GREEN } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { BORDER_MAIN, BORDER_RADIUS_MEDIUM } from 'theme/variables';

export interface ProgressBarProps {
  current: number;
  total: number;
}
export const ProgressBar: FC<ProgressBarProps & BoxProps> = ({ current, total, ...boxProps }) => {
  const progress = Math.floor((current / total) * 100);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '56px',
        border: BORDER_MAIN,
        borderRadius: BORDER_RADIUS_MEDIUM,
        overflow: 'hidden',
        ...boxProps,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: `${progress}%`,
          height: '100%',
          background: COLOR_LIGHT_GREEN,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          strong: { fontWeight: FontWeights.fontWeightBold },
        }}
      >
        Progress bar
      </Typography>
    </Box>
  );
};
