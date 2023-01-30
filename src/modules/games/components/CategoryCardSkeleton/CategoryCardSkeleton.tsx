import { Skeleton, Stack, Typography } from '@mui/material';
import { Card, Proportions } from 'components';

export const CategoryCardSkeleton = () => {
  return (
    <Card sx={{ padding: 1.5, pb: 3 }} noBorder>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ borderRadius: 2, aspectRatio: `${Proportions.p8to6}` }}
      />
      <Stack mt={1}>
        <Typography>
          <Skeleton variant="rounded" width={120} height={28} />
        </Typography>
      </Stack>
    </Card>
  );
};
