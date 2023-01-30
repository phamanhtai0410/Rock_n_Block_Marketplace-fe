import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { Card } from 'components';
import { Avatar } from 'components/Avatar/Avatar';
import { flexHelper } from 'utils';

export const NftCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Card sx={{ padding: theme.spacing(1.75, 2) }}>
      <Box sx={{ ...flexHelper('space-between'), marginBottom: theme.spacing(1) }}>
        <Box sx={{ ...flexHelper('space-between', 'center') }}>
          <Avatar isLoading />
          <Skeleton variant="rounded" width={75} height={24} sx={{ marginLeft: { xs: 1, sm: 0 } }} />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Skeleton variant="rounded" width={34} height={24} sx={{ marginRight: 1 }} />
          <Skeleton variant="rounded" width={52} height={24} />
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 4, aspectRatio: '1 / 1' }} />
      <Box
        sx={{
          padding: theme.spacing(2, 0),
          flexGrow: 1,
          '& > *': {
            padding: theme.spacing(0.25, 0),
          },
        }}
      >
        <Box sx={{ ...flexHelper('space-between') }}>
          <Typography
            variant="body1"
            fontWeight="medium"
            sx={{
              width: '100%',
              marginRight: 2,
            }}
          >
            <Skeleton variant="rounded" width="100%" height={28} />
          </Typography>
          <Typography
            variant="body1"
            sx={{
              borderRadius: 2,
            }}
          >
            <Skeleton variant="rounded" width={64} height={28} />
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: theme.spacing(2.25),
            paddingTop: theme.spacing(1),
            borderTop: theme.themeColors.colorNftCardIdBidBorder,
            ...flexHelper('space-between'),
          }}
        >
          <Typography variant="body1" sx={{ display: 'flex' }}>
            <Skeleton variant="rounded" width={140} height={24} />
          </Typography>
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{
              display: 'flex',
              '&.MuiTypography-root': {
                color: theme.themeColors.colorNftCardInStockText,
              },
            }}
          >
            <Skeleton variant="rounded" width={60} height={24} />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
