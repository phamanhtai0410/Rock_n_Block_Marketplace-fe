import { Skeleton, Stack } from '@mui/material';

export const FieldSkeleton = () => {
  return (
    <Stack>
      <Skeleton variant="text" width={50} />
      <Skeleton variant="rounded" height={48} />
    </Stack>
  );
};
