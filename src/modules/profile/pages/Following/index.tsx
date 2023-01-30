import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { GridContainer } from 'components/GridContainer';
import { useShallowSelector } from 'hooks';
import { FollowingCard } from 'modules/other/components';
import { FollowingCardSkeleton } from 'modules/other/components/FollowingCardSkeleton';
import uiSelector from 'store/ui/selectors';
import { getFollowing } from 'store/user/actions';
import userActionTypes from 'store/user/actionTypes';
import userSelector from 'store/user/selectors';
import { RequestStatus } from 'types';

export const Following = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { following } = useShallowSelector(userSelector.getUser);
  const getFollowingStatus = useShallowSelector(uiSelector.getProp(userActionTypes.GET_FOLLOWING));
  const isFollowingLoading = getFollowingStatus !== RequestStatus.SUCCESS;

  useEffect(() => {
    if (userId) {
      dispatch(getFollowing({ id: userId }));
    }
  }, [dispatch, userId]);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h2">Following</Typography>
      <GridContainer columns={3} spacing={{ xs: 2, sm: 3, md: 4 }} pt={{ xs: 4.75, md: 5.5 }}>
        {isFollowingLoading
          ? [...Array(9).fill(<FollowingCardSkeleton />)]
          : following?.results?.map(({ id, avatar, name }) => (
              <FollowingCard key={id} id={id || 0} followerAvatar={avatar || ''} followerName={name || ''} />
            ))}
      </GridContainer>
    </Box>
  );
};
