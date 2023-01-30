import { Box, Skeleton, Typography } from '@mui/material';
import { Avatar } from 'components/Avatar';
import { Card } from 'components/Card';
import { FollowButton } from 'components/FollowButton';
import { noop } from 'lodash';
import { flexHelper } from 'utils';

export const SellerCardSkeleton = () => {
  return (
    <Card>
      <Box
        sx={(theme) => ({
          ...flexHelper('space-between'),
          paddingBottom: theme.spacing(3),
          borderBottom: `1px solid ${theme.themeColors.colorSellerCardHeaderBorder}`,
        })}
      >
        <Box
          sx={(theme) => ({
            ...flexHelper('space-between'),
            background: theme.themeColors.colorSellerCardBackgroundHover,
            padding: theme.spacing(0.25, 1),
            borderRadius: 6,
          })}
        >
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '22px',
            }}
          >
            <Skeleton variant="text" width={36} />
          </Typography>
        </Box>
        <Skeleton variant="rounded" width={40} height={20}>
          <FollowButton isFollowing={false} onClick={noop} />
        </Skeleton>
      </Box>
      <Box sx={(theme) => ({ ...flexHelper(), flexDirection: 'column', paddingTop: theme.spacing(3) })}>
        <Avatar isLoading size="medium" />
        <Skeleton variant="text" width={128} />
        <Box sx={{ ...flexHelper() }}>
          <Skeleton variant="text" width={64} sx={{ marginRight: 0.25 }} />
        </Box>
      </Box>
    </Card>
  );
};
