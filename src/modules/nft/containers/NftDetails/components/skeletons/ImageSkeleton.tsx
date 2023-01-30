import { Skeleton } from '@mui/material';

export const ImageSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        height: 'unset',
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '20px',
      }}
    />
  );
};
