import { FC, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Menu, Stack, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { Icon } from 'components';
import { NotificationMini } from 'modules/landing/components/NotificationMini';
import { viewNotification } from 'store/notifications/actions';
import { COLOR_PRIMARY_4 } from 'theme/colors';
import { Activity } from 'types/api/Activity';

export const Notifications: FC<{ notifications: Activity[] }> = ({ notifications }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = useMemo(() => !!anchorEl, [anchorEl]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNotificationDropdown = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    dispatch(
      viewNotification({
        activityIds: notifications.map(({ id }) => id) as number[],
      }),
    );
  }, [dispatch, notifications]);

  return (
    <>
      <IconButton
        sx={{
          position: 'relative',
          ...(notifications.length && {
            '&:before': {
              content: '""',
              position: 'absolute',
              right: -12,
              top: -10,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: COLOR_PRIMARY_4,
            },
          }),
        }}
        onClick={notifications.length ? handleOpenNotificationDropdown : () => navigate(routes.activity.root.path)}
      >
        <Icon.Bell />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: { xs: '280px', sm: '360px' }, marginTop: 2 } }}
        MenuListProps={{ sx: { paddingY: 2, maxHeight: { xs: '400px', sm: '500px' } } }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', paddingY: 2, paddingLeft: 2, paddingRight: 3 }}
        >
          <Typography variant="h4" sx={{ fontSize: { xs: '24px', sm: '32px' } }}>
            Notifications
          </Typography>
          <Link to={routes.activity.root.path}>
            <Button size="small" sx={{ width: 'fit-content' }}>
              See all
            </Button>
          </Link>
        </Stack>
        <Box sx={{ maxHeight: { xs: 268, sm: 388 }, overflow: 'scroll' }}>
          {notifications.map(
            ({
              date,
              isViewed,
              fromName,
              currency,
              method,
              price,
              fromImage,
              id,
              tokenId,
              tokenImage,
              toName,
              amount,
              toId,
              fromId,
            }) => {
              return (
                <NotificationMini
                  notificationId={Number(id)}
                  key={id}
                  isSeen={Boolean(isViewed)}
                  name={String(fromName)}
                  currency={String(currency)}
                  type={method as any}
                  buyBidAmount={String(price)}
                  timestamp={String(date)}
                  avatar={fromImage}
                  isHeader
                  amount={amount}
                  tokenId={tokenId}
                  tokenImage={tokenImage}
                  toName={toName}
                  toId={toId}
                  userId={fromId}
                  onClose={handleClose}
                />
              );
            },
          )}
        </Box>
      </Menu>
    </>
  );
};
