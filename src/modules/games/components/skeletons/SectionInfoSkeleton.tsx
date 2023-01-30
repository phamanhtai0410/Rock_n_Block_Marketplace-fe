import { Skeleton, Stack } from '@mui/material';

export const SectionInfoSkeleton = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Skeleton
        variant="rectangular"
        sx={{
          width: 130,
          height: 42,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          width: 250,
          height: 24,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          maxWidth: '500px',
          width: '100%',
          height: 90,
        }}
      />
    </Stack>
  );
};
