import { Link } from 'react-router-dom';
import { Box, BoxProps, Divider, Stack, styled, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { mockAva } from 'assets/images';
import { Email, Icon, Site } from 'components';
import { Copy } from 'components/Copy';
import { FollowButton } from 'components/FollowButton';
import { FacebookOutlined, TwitterOutlined } from 'components/Icon/components';
import moment from 'moment';
import { COLOR_NEUTRALS_4, COLOR_NEUTRALS_5, COLOR_PRIMARY_2 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { shortenPhrase } from 'utils';

export const IconStyles = styled(Box)({
  path: { fill: COLOR_NEUTRALS_4 },
  '&:hover': { path: { fill: COLOR_PRIMARY_2 } },
});

export const getFullUrl = (url: string) => {
  return url.includes('http') ? url : `https://${url}`;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileInfoCardProps {
  id: number | string;
  avatar: string;
  name: string;
  address: string;
  followerCount: string;
  followingCount: string;
  bio: string;
  site: string;
  email: string;
  twitter: string;
  instagram: string;
  facebook: string;
  createdDate: string;
  isShowFollowingButton?: boolean;
  isFollowing?: boolean;
  onFollowClick: (isFollow: boolean) => void;
}

export const ProfileInfoCard = ({
  id,
  avatar,
  isFollowing,
  name,
  address,
  followerCount,
  followingCount,
  isShowFollowingButton,
  bio,
  site,
  email,
  twitter,
  instagram,
  facebook,
  createdDate,
  onFollowClick,
  ...boxProps
}: ProfileInfoCardProps & Omit<BoxProps, 'id'>) => {
  const theme = useTheme();

  return (
    <Box
      {...boxProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { xs: 319, md: 256 },
        backgroundColor: theme.themeColors.colorNftCardBackgroundDefault,
        borderRadius: '16px',
        padding: 4,
        ...boxProps.sx,
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <Box component="img" src={avatar || mockAva} sx={{ width: 128, borderRadius: '50%', aspectRatio: '1 / 1' }} />
      </Box>
      <Typography
        className="xl"
        fontWeight={FontWeights.fontWeightSemiBold}
        sx={{ marginBottom: 1, wordBreak: 'break-all', textAlign: 'center' }}
      >
        {name}
      </Typography>
      <Copy copyText={address} sx={{ marginBottom: 1 }}>
        {shortenPhrase(address, 10, 4)}
      </Copy>
      <Box sx={{ marginBottom: 1 }}>
        <Box component={Link} to={routes.followers.root.getPath(id)}>
          <Typography
            variant="button"
            className="s"
            sx={{ color: COLOR_NEUTRALS_4, fontWeight: FontWeights.fontWeightMedium }}
          >
            <Box component="span" sx={{ color: COLOR_NEUTRALS_5 }}>
              {followerCount}
            </Box>{' '}
            Followers
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Box component={Link} to={routes.following.root.getPath(id)}>
          <Typography
            variant="button"
            className="s"
            sx={{ color: COLOR_NEUTRALS_4, fontWeight: FontWeights.fontWeightMedium }}
          >
            <Box component="span" sx={{ color: COLOR_NEUTRALS_5 }}>
              {followingCount}
            </Box>{' '}
            Following
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography className="xs" textAlign="center" sx={{ color: COLOR_NEUTRALS_4 }}>
          {bio}
        </Typography>
      </Box>
      {site && (
        <Box sx={{ marginBottom: 2, width: '100%' }}>
          <Site site={site} />
        </Box>
      )}
      {email && (
        <Box sx={{ marginBottom: 4, width: '100%' }}>
          <Email email={email} />
        </Box>
      )}
      {isShowFollowingButton && (
        <Box sx={{ mb: 4 }}>
          <FollowButton variant="button" isFollowing={!!isFollowing} onClick={onFollowClick} />
        </Box>
      )}
      <Stack
        direction="row"
        spacing={3}
        sx={{
          mt: 1,
          marginBottom: 3,
          alignItems: 'center',
          display: !twitter && !instagram && !facebook ? 'none' : 'flex',
        }}
      >
        {twitter && (
          <IconStyles>
            <a href={`https://twitter.com/${twitter.replaceAll('@', '')}`} target="_blank" rel="noreferrer">
              <TwitterOutlined />
            </a>
          </IconStyles>
        )}
        {instagram && (
          <IconStyles>
            <a href={`https://www.instagram.com/${instagram.replaceAll('@', '')}/`} target="_blank" rel="noreferrer">
              <Icon.Instagram sx={{ width: '21px' }} />
            </a>
          </IconStyles>
        )}
        {facebook && (
          <IconStyles>
            <a href={`https://facebook.com/${facebook}`} target="_blank" rel="noreferrer">
              <FacebookOutlined />
            </a>
          </IconStyles>
        )}
      </Stack>
      <Divider flexItem sx={{ marginBottom: 3 }} />
      <Typography className="xs" sx={{ color: COLOR_NEUTRALS_4 }}>
        Member since {moment(createdDate).format('MMM DD, YYYY')}
      </Typography>
    </Box>
  );
};
