import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Avatar } from 'components';
import { BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { flexHelper } from 'utils';

export type FollowingCardProps = {
  id: number;
  followerName: string;
  followerAvatar: string;
};

export const FollowingCard: FC<FollowingCardProps> = ({ followerAvatar, followerName, id }) => {
  const theme = useTheme();
  return (
    <Link to={routes.profile.root.getPath(id)}>
      <Box
        sx={{
          ...flexHelper('flex-start', 'center'),
          width: '100%',
          padding: theme.spacing(2, 2.5),
          background: theme.themeColors.colorsFollowingCardBackground,
          borderRadius: BORDER_RADIUS_DEFAULT,
          cursor: 'pointer',
          '&:hover': {
            background: theme.themeColors.colorFollowingCardBackgroundHover,
          },
          '&:active': {
            background: theme.themeColors.colorFollowingCardBackgroundFocus,
          },
        }}
      >
        <Avatar image={followerAvatar} size="xl" isWithBorder={false} />
        <Typography
          variant="body1"
          className="s"
          ml={3}
          sx={{
            overflow: 'hidden',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {followerName}
        </Typography>
      </Box>
    </Link>
  );
};
