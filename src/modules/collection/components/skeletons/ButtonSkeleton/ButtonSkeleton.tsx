import { Skeleton } from '@mui/material';
import { BORDER_RADIUS_BUTTON } from 'theme/variables';

export const ButtonSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      sx={{
        height: 52,
        borderRadius: BORDER_RADIUS_BUTTON,
      }}
    />
  );
};
