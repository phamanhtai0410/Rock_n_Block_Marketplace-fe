import { Skeleton, Stack } from '@mui/material';

export const SectionHeaderSkeleton = () => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
      <Skeleton variant="circular" width="100%" sx={{ maxWidth: 120, height: 120 }} />
      <Skeleton
        variant="text"
        sx={{
          width: 120,
          height: 58,
        }}
      />
    </Stack>
  );
};
