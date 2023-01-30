import { Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { Avatar } from 'components/Avatar/Avatar';
import { Card } from 'components/Card';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

import { Text } from '../../TopCollectionCard';

export const TopCollectionCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Card
      noBorder
      sx={{
        ...flexHelper('flex-start', 'center'),
      }}
    >
      <Typography
        variant="body1"
        className="xl"
        sx={{ color: theme.themeColors.colorTopCollectionCardTextDefault, marginRight: 1.5 }}
      >
        <Skeleton variant="rounded" width={8} height={32} />
      </Typography>
      <Stack justifyContent="space-between" direction="row">
        <Avatar isLoading size="xl" />
        <Stack ml={1} spacing={1}>
          <Typography
            variant="body1"
            className="xs"
            fontWeight={FontWeights.fontWeightMedium}
            sx={{ color: theme.themeColors.colorTopCollectionCardTextDefault }}
          >
            <Skeleton variant="rounded" width={128} />
          </Typography>
          <Text lineHeight="20px" sx={{ display: 'flex' }}>
            <Skeleton variant="rounded" width={66} />
            <Skeleton variant="rounded" width={30} sx={{ marginLeft: 1 }} />
          </Text>
          <Text variant="body1" sx={{ display: 'flex' }}>
            <Skeleton variant="rounded" width={75} />
            <Skeleton variant="rounded" width={30} sx={{ marginLeft: 1 }} />
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};
