import { Skeleton, Stack } from '@mui/material';

export const CollectionHeaderSkeleton = () => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'start' }}
      spacing={4}
      sx={{ marginBottom: 4 }}
    >
      <Skeleton variant="circular" width="100%" sx={{ maxWidth: 120, height: 120 }} />
      <Stack sx={{ alignItems: { xs: 'center', sm: 'start' } }} spacing={1}>
        <Skeleton
          variant="text"
          sx={{
            width: 120,
            height: 40,
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 130,
            height: 42,
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 250,
            height: 32,
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 200,
            height: 32,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: 174,
            height: 40,
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            maxWidth: '500px',
            width: '100%',
            height: 90,
          }}
        />
      </Stack>
    </Stack>
  );
};
