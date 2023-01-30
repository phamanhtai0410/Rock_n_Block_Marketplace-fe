import { Box, Skeleton, useTheme } from '@mui/material';
import { flexHelper } from 'utils';

export const ControlsSkeleton = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...flexHelper(),
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'row',
        },
      }}
    >
      <Skeleton
        variant="circular"
        sx={{
          width: 48,
          height: 48,
          mb: 3,
          [theme.breakpoints.down('md')]: {
            mb: 0,
            mr: 3,
          },
        }}
      />
      <Skeleton
        variant="circular"
        sx={{
          width: 48,
          height: 48,
        }}
      />
    </Box>
  );
};
