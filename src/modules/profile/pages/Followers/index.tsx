import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { GridContainer } from 'components/GridContainer';
import { useShallowSelector } from 'hooks';
import { FollowingCard } from 'modules/other/components';
import { FollowingCardSkeleton } from 'modules/other/components/FollowingCardSkeleton';
import uiSelector from 'store/ui/selectors';
import { getFollowers } from 'store/user/actions';
import userActionTypes from 'store/user/actionTypes';
import userSelector from 'store/user/selectors';
import { RequestStatus } from 'types';

export const Followers = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { followers } = useShallowSelector(userSelector.getUser);
  const getFollowersStatus = useShallowSelector(uiSelector.getProp(userActionTypes.GET_FOLLOWERS));
  const isFollowersLoading = getFollowersStatus !== RequestStatus.SUCCESS;

  useEffect(() => {
    if (userId) {
      dispatch(getFollowers({ id: userId }));
    }
  }, [dispatch, userId]);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h2">Followers</Typography>
      <GridContainer columns={3} spacing={{ xs: 2, sm: 3, md: 4 }} pt={{ xs: 4.75, md: 5.5 }}>
        {isFollowersLoading
          ? [...Array(9).fill(<FollowingCardSkeleton />)]
          : followers?.results?.map(({ id, avatar, name }) => (
              <FollowingCard key={id} id={id || 0} followerAvatar={avatar || ''} followerName={name || ''} />
            ))}
      </GridContainer>
    </Box>
  );
};
