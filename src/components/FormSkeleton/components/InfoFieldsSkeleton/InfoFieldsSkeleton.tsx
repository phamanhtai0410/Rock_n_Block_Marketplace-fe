/* eslint-disable react/no-array-index-key */
import { Skeleton, Stack } from '@mui/material';
import { FieldSkeleton } from 'components/FormSkeleton/components/FieldSkeleton';
import { fillArray } from 'utils';

export const InfoFieldsSkeleton = ({ withLabels = false }) => {
  return (
    <Stack spacing={4}>
      {withLabels && <Skeleton variant="text" width={100} height={26} sx={{ marginBottom: 4 }} />}
      {fillArray(3).map((_, index) => (
        <FieldSkeleton key={index} />
      ))}
      <Stack>
        <Skeleton variant="text" width={50} />
        <Skeleton variant="rounded" height={140} />
      </Stack>
    </Stack>
  );
};
