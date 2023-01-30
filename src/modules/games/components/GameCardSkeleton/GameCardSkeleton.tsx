import { Skeleton, Stack, Typography } from '@mui/material';
import { Card, Proportions } from 'components';

export const GameCardSkeleton = () => {
  return (
    <Card sx={{ padding: 1.5, pb: 3 }} noBorder>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ borderRadius: 2, aspectRatio: `${Proportions.p16to9}` }}
      />
      <Stack spacing={1} mt={1}>
        <Typography>
          <Skeleton variant="rounded" width={120} height={24} />
        </Typography>

        <Typography>
          <Skeleton variant="rounded" width="100%" height={70} />
        </Typography>
      </Stack>
    </Card>
  );
};
