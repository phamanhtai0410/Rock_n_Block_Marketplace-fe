/* eslint-disable react/no-array-index-key */
import { Divider, Skeleton, Stack } from '@mui/material';
import { ITEMS_PER_PAGE_6 } from 'appConstants';
import { fillArray } from 'utils';

import { ButtonSkeleton } from '../ButtonSkeleton';

export const CollectionPropertiesSkeletons = () => {
  return (
    <Stack spacing={2.75}>
      <ButtonSkeleton />
      {fillArray(ITEMS_PER_PAGE_6).map((property, index) => (
        <Stack key={index}>
          <Divider />
          <Skeleton variant="rounded" height={42} sx={{ mt: 2 }} />
        </Stack>
      ))}
    </Stack>
  );
};
