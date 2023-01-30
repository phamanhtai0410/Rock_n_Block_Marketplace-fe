import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { flexHelper } from 'utils';

export const FollowingCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...flexHelper('flex-start', 'center'),
        width: '100%',
        padding: theme.spacing(2, 2.5),
        background: theme.themeColors.colorsFollowingCardBackground,
        borderRadius: BORDER_RADIUS_DEFAULT,
      }}
    >
      <Skeleton variant="circular" sx={{ minWidth: 64, height: 64, marginRight: 1 }} />

      <Typography
        variant="body1"
        className="s"
        ml={3}
        sx={{
          width: '100%',
        }}
      >
        <Skeleton />
      </Typography>
    </Box>
  );
};
