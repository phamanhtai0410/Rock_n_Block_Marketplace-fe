/* eslint-disable react/no-array-index-key */
import { Skeleton, Stack } from '@mui/material';
import { ITEMS_PER_PAGE_6 } from 'appConstants';
import { FieldSkeleton } from 'components/FormSkeleton/components/FieldSkeleton';
import { fillArray } from 'utils';

export const SocialsSkeletons = ({ withLabels = false }) => {
  return (
    <Stack spacing={4}>
      {withLabels && <Skeleton variant="text" width={100} height={26} sx={{ marginBottom: 4 }} />}
      {fillArray(ITEMS_PER_PAGE_6).map((_, index) => (
        <FieldSkeleton key={index} />
      ))}
    </Stack>
  );
};
