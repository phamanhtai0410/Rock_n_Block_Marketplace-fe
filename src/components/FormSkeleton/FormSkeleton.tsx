import { Box, Stack } from '@mui/material';

import { InfoFieldsSkeleton, SocialsSkeletons } from './components';

type FormSkeletonProps = {
  withLabels?: boolean;
};

export const FormSkeleton = ({ withLabels = false }: FormSkeletonProps) => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 14 }}>
      <Box sx={{ maxWidth: '443px', width: '100%' }}>
        <InfoFieldsSkeleton withLabels={withLabels} />
      </Box>
      <Box sx={{ maxWidth: '443px', width: '100%' }}>
        <SocialsSkeletons withLabels={withLabels} />
      </Box>
    </Stack>
  );
};
