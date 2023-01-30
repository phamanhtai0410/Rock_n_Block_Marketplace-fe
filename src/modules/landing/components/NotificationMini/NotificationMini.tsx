import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, BoxProps, Button, Skeleton, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { noop } from 'lodash';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_2, COLOR_PRIMARY_1 } from 'theme/colors';
import { Method } from 'types/api/enums';
import { getTimeAgo } from 'utils';
import { shortenName } from 'utils/shortenName';
import { updateTextWithVars } from 'utils/updateTextWithVars';

import { UserImage } from '../UserImage';

import { textHelper } from './NotificationMini.helper';

export interface NotificationMiniProps {
  notificationId: number;
  isSeen: boolean;
  name: string;
  currency: string;
  type: Method;
  buyBidAmount: string;
  timestamp: string;
  avatar?: string;
  isHeader?: boolean;
  onViewNotification?: (activityId: number) => void;
  amount?: string;
  tokenId?: string;
  tokenImage?: string;
  userId?: string;
  isUserRelatedActivity?: boolean;
  toName?: string;
  toId?: string;
  onClose?: () => void;
}

export const NotificationMini: FC<NotificationMiniProps & Omit<BoxProps, 'id'>> = ({
  notificationId,
  isSeen,
  name,
  type,
  currency,
  buyBidAmount,
  timestamp,
  avatar,
  isHeader,
  onViewNotification,
  amount,
  tokenId,
  userId,
  tokenImage,
  isUserRelatedActivity,
  toName,
  toId,
  onClose,
  ...boxProps
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSeenInner, setIsSeenInner] = useState(isSeen);

  const {
    user: { id: myId },
  } = useShallowSelector(userSelector.getUser);

  const handleNotificationClick = () => {
    onViewNotification?.(notificationId);
    setIsSeenInner(true);
  };

  const handleNavigate = () => {
    if (type !== Method.follow) {
      navigate(routes.nft.root.getPath(Number(tokenId)));
    } else {
      const pickUserId = userId && toId ? userId : toId;
      navigate(routes.profile.root.getPath(String(pickUserId)));
    }

    onClose?.();
  };

  useEffect(() => {
    setIsSeenInner(isSeen);
  }, [isSeen]);
  return (
    <Box
      {...boxProps}
      onClick={isSeen ? noop : handleNotificationClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 3, 2, 2),
        background: theme.themeColors.colorNotificationMiniBackground,
        borderRadius: '16px',
        cursor: 'pointer',
        overflowX: 'hidden',
        overflowY: 'auto',
        '& > *:first-child': {
          mr: 2,
        },
        ...boxProps.sx,
      }}
    >
      <Button sx={{ p: 0, minWidth: 64 }} onClick={handleNavigate} variant="text">
        <UserImage type="square" avatar={type === Method.follow ? avatar : tokenImage} />
      </Button>
      <Box>
        <Typography
          sx={{
            maxWidth: 190,
            color: theme.themeColors.colorcolorNotificationMiniText,
            span: {
              color: COLOR_PRIMARY_1,
            },
          }}
          dangerouslySetInnerHTML={{
            __html: updateTextWithVars(
              {
                name,
                price: buyBidAmount,
                currency,
                amount: amount as string,
                pronoun: isUserRelatedActivity ? 'your' : '',
                toName: isUserRelatedActivity ? 'you' : shortenName(toName || ''),
              },
              textHelper[type === Method.AuctionWin && userId && myId === Number(userId) ? Method.Buy : type],
            ),
          }}
        />
        <Typography
          className="xs"
          sx={{
            color: theme.themeColors.colorTextBody2,
          }}
        >{`${getTimeAgo(timestamp)} ago`}</Typography>
      </Box>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          transition: '200ms',
          background: isSeenInner ? COLOR_NEUTRALS_2 : COLOR_PRIMARY_1,
          ml: 'auto',
          aspectRatio: '1 / 1',
        }}
      />
    </Box>
  );
};

export const NotificationMiniSkeleton = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 3, 2, 2),
        background: theme.themeColors.colorNotificationMiniBackground,
        borderRadius: '16px',
        '& > *:first-child': {
          mr: 2,
        },
      }}
    >
      <Skeleton
        variant="circular"
        sx={{
          width: 64,
          height: 64,
          borderRadius: '20px',
          aspectRatio: '1 / 1',
        }}
      />
      <Box sx={{ marginRight: 1 }}>
        <Skeleton variant="text" sx={{ width: 190, fontSize: '1rem' }} />
        <Typography className="xs">
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </Typography>
      </Box>
      <Skeleton
        variant="circular"
        sx={{
          width: 12,
          height: 12,
          ml: 'auto',
          aspectRatio: '1 / 1',
        }}
      />
    </Box>
  );
};
