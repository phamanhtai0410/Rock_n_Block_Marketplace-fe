import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Box, BoxProps, styled, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { Avatar } from 'components/Avatar';
import { Card } from 'components/Card';
import { FollowButton } from 'components/FollowButton';
import { ShareButton } from 'components/ShareButton';
import { noop } from 'lodash';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

import { getIconFromPlace, placeColors, textColors } from './SellerCard.helpers';

export interface SellerCardProps {
  place: string | number;
  color: 'pink' | 'green' | 'black';
  avatar: string;
  name: string;
  tradeVolume: string | number;
  currency: string;
  isFollowing?: boolean;
  onClick?: (isFollowing: boolean) => void;
  id?: string;
  myId?: number;
}

export const SubtitleText = styled(Typography)({
  fontSize: '12px',
  lineHeight: '20px',
});

export const SellerCard: FC<SellerCardProps & Omit<BoxProps, 'color' | 'onClick'>> = ({
  place,
  color,
  avatar,
  name,
  tradeVolume,
  currency,
  isFollowing = false,
  onClick = noop,
  id,
  myId,
  ...boxProps
}) => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (id) {
      navigate(routes.profile.root.getPath(id));
    }
  };
  return (
    <Card {...boxProps}>
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
            background: placeColors[color],
            padding: theme.spacing(0.25, 1),
            borderRadius: 6,
            width: '36px',
          })}
        >
          {getIconFromPlace(+place, textColors[color])}
          <Typography
            sx={{
              color: textColors[color],
              fontSize: '12px',
              lineHeight: '20px',
              fontWeight: FontWeights.fontWeightSemiBold,
            }}
          >
            #{place}
          </Typography>
        </Box>
        <Box sx={{ ...flexHelper() }}>
          {!!(isFollowing !== undefined && myId && String(myId) !== String(id)) && (
            <FollowButton isFollowing={isFollowing} onClick={onClick} />
          )}

          <ShareButton url={`${window.location.host}/profile/${id}`} hasBackground={false} sx={{ ...flexHelper() }} />
        </Box>
      </Box>
      <Box sx={(theme) => ({ ...flexHelper(), flexDirection: 'column', paddingTop: theme.spacing(3) })}>
        <Avatar image={avatar} size="medium" onClick={handleAvatarClick} />
        <Typography
          sx={(theme) => ({
            color: theme.themeColors.colorSellerCardText,
            fontWeight: FontWeights.fontWeightBold,
            textAlign: 'center',
          })}
        >
          {name}
        </Typography>
        <Box sx={{ ...flexHelper() }}>
          <SubtitleText
            sx={(theme) => ({
              color: theme.themeColors.colorSellerCardText,
              fontWeight: FontWeights.fontWeightBold,
              marginRight: theme.spacing(0.25),
            })}
          >
            {tradeVolume}
          </SubtitleText>
          <SubtitleText
            sx={(theme) => ({
              color: theme.themeColors.colorSellerCardCurrency,
            })}
          >
            {currency}
          </SubtitleText>
        </Box>
      </Box>
    </Card>
  );
};
