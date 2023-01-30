import { Stack } from '@mui/material';

import { SectionHeaderSkeleton } from './SectionHeaderSkeleton';
import { SectionInfoSkeleton } from './SectionInfoSkeleton';

export const GameHeaderSkeleton = () => {
  return (
    <Stack
      spacing={3}
      direction="column"
      alignItems={{ xs: 'center', sm: 'start' }}
      sx={{ paddingTop: { sm: 13, md: 20 } }}
    >
      <SectionHeaderSkeleton />
      <SectionInfoSkeleton />
    </Stack>
  );
};
