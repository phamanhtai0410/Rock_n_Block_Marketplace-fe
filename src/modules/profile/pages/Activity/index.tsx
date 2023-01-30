/* eslint-disable react/no-array-index-key */
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useShallowSelector } from 'hooks';
import { useIntersectionObserver } from 'hooks/useInterSectionObserver';
import { NotificationMini, NotificationMiniSkeleton } from 'modules/landing/components/NotificationMini';
import { getUserNotifications, viewNotification } from 'store/notifications/actions';
import notificationsActionTypes from 'store/notifications/actionTypes';
import { setInitialUserNotifications, updateUserNotifications } from 'store/notifications/reducer';
import notificationsSelectors from 'store/notifications/selectors';
import uiSelectors from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { Nullable } from 'types';
import { Method } from 'types/api/enums';
import { RequestStatus } from 'types/store';

import { ActivityTabs, activityTabs } from './Activity.helper';

interface TabPanelProps {
  children: ReactNode;
  index: any;
  value: any;
}

export const TabPanel = ({ children, value, index }: TabPanelProps) => (value === index ? <Box>{children}</Box> : null);

const NOTIFICATIONS_PER_PAGE = 20;

export const Activity = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(activityTabs[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const { address } = useShallowSelector(userSelector.getUser);
  const { [notificationsActionTypes.GET_USER_NOTIFICATIONS]: getNotificationsStatus } = useShallowSelector(
    uiSelectors.getUI,
  );
  const theme = useTheme();

  const { userNotifications } = useShallowSelector(notificationsSelectors.getNotifications);

  const handleChangeTab = (_: unknown, newValue: string) => {
    dispatch(setInitialUserNotifications());
    setCurrentPage(1);
    setSelectedTab(newValue);
  };

  const handleView = (notificationId: number) => {
    dispatch(
      viewNotification({
        activityIds: [notificationId],
      }),
    );
  };

  const handleViewAll = () => {
    dispatch(
      viewNotification({
        method: 'all',
      }),
    );
    dispatch(
      updateUserNotifications({
        ...userNotifications,
        results: userNotifications.results.map((notifcation) => {
          return {
            ...notifcation,
            isViewed: true,
          };
        }),
      }),
    );
  };

  const infiniteScrollRef = useRef<Nullable<HTMLDivElement>>(null);

  const intersection = useIntersectionObserver(infiniteScrollRef, {});

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setCurrentPage((prevstate) => prevstate + 1);
    }
  }, [intersection?.isIntersecting, infiniteScrollRef]);

  useEffect(() => {
    if (!address.length) {
      return;
    }
    dispatch(
      getUserNotifications({
        address,
        itemsPerPage: String(NOTIFICATIONS_PER_PAGE),
        page: String(currentPage),
        isConcat: !!currentPage,
        isFollowers: selectedTab === ActivityTabs.Follow,
      }),
    );
  }, [address, currentPage, dispatch, selectedTab]);

  useEffect(() => {
    return () => {
      dispatch(setInitialUserNotifications());
    };
  }, [dispatch]);

  if (!address.length) {
    return <Typography variant="h3">Please connect wallet</Typography>;
  }

  return (
    <Box sx={{ width: { xs: '100%', sm: '600px' }, marginBottom: 16 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'start', sm: 'center' }, marginBottom: 6 }}
      >
        <Typography variant="h2" sx={() => ({ fontSize: '32px', lineHeight: '40px' })}>
          Activity
        </Typography>
        <Button onClick={handleViewAll} variant="outlined" size="small">
          Mark all as read
        </Button>
      </Stack>
      <Box sx={{ width: '100vw', marginLeft: -4, marginBottom: 4, '.MuiTabs-scroller': { paddingLeft: 4 } }}>
        <Tabs value={selectedTab} onChange={handleChangeTab} variant="scrollable">
          {activityTabs.map(({ value, label }) => (
            <Tab
              key={label}
              value={value}
              label={label}
              sx={{ '&.Mui-selected': { color: theme.themeColors.colorTabItemTextActive }, mr: 1 }}
            />
          ))}
        </Tabs>
      </Box>
      {!!userNotifications.results.length &&
        userNotifications.results.map(
          ({
            date,
            isViewed,
            fromName,
            currency,
            method,
            price,
            fromImage,
            fromId,
            id,
            amount,
            tokenId,
            tokenImage,
            toName,
            toId,
          }) => (
            <NotificationMini
              key={Number(id)}
              notificationId={Number(id)}
              isSeen={Boolean(isViewed)}
              name={String(fromName)}
              currency={String(currency)}
              type={method as Method}
              buyBidAmount={String(price)}
              timestamp={String(date)}
              avatar={fromImage}
              userId={fromId}
              sx={{ marginBottom: 2, background: theme.themeColors.colorNotificationMiniBackgroundAll }}
              onViewNotification={handleView}
              amount={amount}
              tokenId={tokenId}
              tokenImage={tokenImage}
              isUserRelatedActivity={selectedTab === ActivityTabs.MyActivity}
              toName={toName}
              toId={toId}
            />
          ),
        )}
      {getNotificationsStatus === RequestStatus.REQUEST && (
        <>
          {Array(20)
            .fill('')
            .map((_, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <NotificationMiniSkeleton />
              </Box>
            ))}
        </>
      )}
      <Box
        sx={{
          display:
            userNotifications.totalPages > currentPage || getNotificationsStatus === RequestStatus.REQUEST
              ? 'block'
              : 'none',
        }}
        ref={infiniteScrollRef}
      />
    </Box>
  );
};
