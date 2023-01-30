/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Box, BoxProps, Button, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { BackgroundCover, LoadMoreButton } from 'components';
import { ChainFilter } from 'components/ChainFilter';
import { EditCover } from 'components/EditCover';
import { GameCard } from 'components/GameCard';
import { GridContainer } from 'components/GridContainer';
import { NftCard } from 'components/NftCard';
import { NftCardSkeleton } from 'components/NftCard/components/NftCardSkeleton';
import { ProfileInfoCard } from 'components/ProfileInfoCard';
import { TopCollectionCard } from 'components/TopCollectionCard';
import { TopCollectionCardSkeleton } from 'components/TopCollectionCard/components/TopCollectionCardSkeleton';
import { useShallowSelector, useStateParam } from 'hooks';
import { useLoadOnScrollNotEven } from 'hooks/useLoadOnScrollNotEven/useLoadOnScrollNotEven';
import { GameCardSkeleton } from 'modules/games/components';
import { TextFieldWithLabel } from 'modules/layout/containers/Filters';
import { like } from 'store/nft/actions';
import { getProfileInfobyId, getProfileTabData } from 'store/profile/actions';
import profileActionTypes from 'store/profile/actionTypes';
import { clearProfile, updateProfileTabData } from 'store/profile/reducer';
import profileSelector from 'store/profile/selectors';
import uiSelector from 'store/ui/selectors';
import { follow, updateUserCover } from 'store/user/actions';
import userSelector from 'store/user/selectors';
import { TextFieldLabel } from 'theme/variables';
import { select } from 'typed-redux-saga';
import { ProfileState, ProfileTab, RequestStatus } from 'types';
import { WithId } from 'types/requests';

import { TabPanel } from '../Activity';

type EditButtonsProps = {
  isDisplayButtons: boolean;
  userId: string | number;
  onUpdateCover: (file: File) => void;
  onDeleteCover: () => void;
};

const ITEMS_PER_PAGE = 6;

const EditButtons: FC<EditButtonsProps & BoxProps> = ({
  isDisplayButtons,
  userId,
  onUpdateCover,
  onDeleteCover,
  ...props
}) => (
  <Box
    {...props}
    // eslint-disable-next-line react/destructuring-assignment
    sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'end' }, marginTop: 16, marginBottom: 8, ...props.sx }}
  >
    {isDisplayButtons ? (
      <>
        <Button component={Link} to={routes.editProfile.root.path} size="small" variant="contained" color="secondary">
          Edit profile
        </Button>
        <EditCover onUpdateCover={onUpdateCover} onDeleteCover={onDeleteCover} />
      </>
    ) : (
      <Box sx={{ height: '40px' }} />
    )}
  </Box>
);

const tabs = [
  { value: ProfileTab.Owned, label: 'Owned' },
  { value: ProfileTab.ForSale, label: 'For sale' },
  { value: ProfileTab.Bided, label: 'Bided' },
  { value: ProfileTab.Favorites, label: 'Favorites' },
  { value: ProfileTab.Collections, label: 'Collections' },
  { value: ProfileTab.Sold, label: 'Sold' },
  { value: ProfileTab.Games, label: 'Games' },
];

export const Profile = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useStateParam('tab', ProfileTab.Owned);
  const [network, setNetwork] = useStateParam('chain', '');
  const [currentPage, setCurrentPage] = useState(1);
  const { id: userId } = useParams<WithId>() as WithId;
  const {
    user: { id },
  } = useShallowSelector(userSelector.getUser);
  const theme = useTheme();

  const getProfileInfoStatus = useShallowSelector(uiSelector.getProp(profileActionTypes.GET_PROFILE_INFO));
  const getProfileTabDataStatus = useShallowSelector(uiSelector.getProp(profileActionTypes.GET_PROFILE_TAB_DATA));

  const isProfileTabDataLoading = getProfileTabDataStatus === RequestStatus.REQUEST;
  const isProfileInfoLoading = getProfileInfoStatus === RequestStatus.REQUEST;

  const {
    profile: {
      avatar,
      address: userAddress,
      name,
      followersCount,
      followsCount,
      bio,
      site,
      email,
      twitter,
      instagram,
      facebook,
      createdAt,
      followers,
      cover,
    },
    profileTabData,
  } = useShallowSelector(profileSelector.getProfile);

  const isAbleToEdit = useMemo(() => String(userId) === String(id), [id, userId]);

  const collections = useMemo(
    () => profileTabData[ProfileTab.Collections]?.results?.filter(({ isDefault }) => isDefault !== true),
    [profileTabData],
  );

  const handleChange = (_, newValue: ProfileTab = value, chain = network) => {
    dispatch(
      updateProfileTabData({
        [ProfileTab.Owned]: null,
        [ProfileTab.ForSale]: null,
        [ProfileTab.Bided]: null,
        [ProfileTab.Favorites]: null,
        [ProfileTab.Collections]: null,
        [ProfileTab.Sold]: null,
        [ProfileTab.Games]: null,
      }),
    );
    dispatch(
      getProfileTabData({
        profileId: userId,
        profileTab: newValue,
        page: 1,
        itemsPerPage: ITEMS_PER_PAGE,
        network: chain,
      }),
    );
    setCurrentPage(1);
    setValue(newValue);
  };

  const isFollowed = useMemo(
    () => (followers?.length ? followers.findIndex((userFollow) => userFollow.id === id) >= 0 : false),
    [followers, id],
  );

  const handleLikeClick = useCallback(
    (likedNftId: string) => {
      dispatch(like({ id: String(likedNftId) }));
    },
    [dispatch],
  );

  const handleLoadMoreClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(
      getProfileTabData({
        profileId: userId,
        profileTab: value,
        page: nextPage,
        network,
        itemsPerPage: ITEMS_PER_PAGE,
      }),
    );
  };

  const handleFollowClick = (isFollowing2: boolean) => {
    if (userId) {
      dispatch(follow({ isFollowing: isFollowing2, id: userId }));
    }
  };

  const handleUpdateCover = useCallback(
    (currentFile: File) => {
      dispatch(updateUserCover({ cover: currentFile }));
    },
    [dispatch],
  );

  const handleDeleteCover = useCallback(() => {
    dispatch(updateUserCover({ cover: null }));
  }, [dispatch]);

  const skeletonDisplayAmount =
    currentPage === 1 ? ITEMS_PER_PAGE : (profileTabData[value]?.total || 0) % ITEMS_PER_PAGE;

  const { ref } = useLoadOnScrollNotEven({ currentPage, loadMore: handleLoadMoreClick, config: { threshold: 0.75 } });

  useEffect(
    () => () => {
      dispatch(clearProfile());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getProfileInfobyId({ id: userId, itemsPerPage: ITEMS_PER_PAGE }));
    handleChange(undefined);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [dispatch, userId]);

  return (
    <Box>
      <BackgroundCover cover={cover} />
      <EditButtons
        onDeleteCover={handleDeleteCover}
        onUpdateCover={handleUpdateCover}
        userId={userId}
        isDisplayButtons={isAbleToEdit}
        sx={{ display: { xs: 'flex', md: 'none' }, marginTop: 0 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'start' },
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <ProfileInfoCard
          id={userId}
          avatar={avatar}
          address={userAddress}
          isFollowing={isFollowed}
          onFollowClick={handleFollowClick}
          isShowFollowingButton={!isAbleToEdit}
          name={name}
          followerCount={followersCount?.toString()}
          followingCount={followsCount?.toString()}
          bio={bio}
          site={site}
          email={email}
          twitter={twitter}
          instagram={instagram}
          facebook={facebook}
          createdDate={createdAt}
          sx={{ marginRight: { xs: 0, md: 4 }, mb: { xs: 1.25, md: 0 }, zIndex: 1 }}
        />
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <EditButtons
            onDeleteCover={handleDeleteCover}
            onUpdateCover={handleUpdateCover}
            userId={userId}
            isDisplayButtons={isAbleToEdit}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          />
          <TextFieldWithLabel
            sx={{
              marginBottom: 2,
              width: 'fit-content',
              marginRight: 'auto',
              marginLeft: { xs: 'auto', md: 'initial' },
            }}
          >
            <TextFieldLabel>Blockchain</TextFieldLabel>
            <ChainFilter
              defaultValue={network}
              onChange={(e) => {
                handleChange(undefined, undefined, e.target.value);
                setNetwork(e.target.value);
              }}
            />
          </TextFieldWithLabel>

          <Box
            sx={{
              marginTop: { xs: 8, md: 0 },
              marginBottom: 4,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{ marginBottom: 3 }}
              variant="scrollable"
              scrollButtons={false}
            >
              {tabs.map(({ value: index, label }) => (
                <Tab
                  key={index}
                  value={index}
                  label={label}
                  sx={{
                    '&.Mui-selected': { color: theme.themeColors.colorTabItemTextActive },
                    '& + &': { marginLeft: 1 },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {tabs.map(({ value: index }) => (
            <TabPanel key={index} value={value} index={index}>
              {!profileTabData[index]?.results?.length && !isProfileTabDataLoading && !isProfileInfoLoading && (
                <Typography variant="h4" textAlign="center">
                  Nothing to show
                </Typography>
              )}
              {index === ProfileTab.Games && (
                <GridContainer columns={2}>
                  {isProfileTabDataLoading || isProfileInfoLoading
                    ? [
                        ...[
                          currentPage === 1
                            ? []
                            : profileTabData[ProfileTab.Games]?.results?.map((game) => (
                                <GameCard key={game.name + String(game?.network?.name)} {...game} />
                              )),
                        ],
                        ...Array(skeletonDisplayAmount)
                          .fill('')
                          .map((_, skeletonIndex) => <GameCardSkeleton key={skeletonIndex} />),
                      ]
                    : profileTabData[ProfileTab.Games]?.results?.map((game) => (
                        <GameCard key={game.name + String(game?.network?.name)} {...game} />
                      ))}
                </GridContainer>
              )}
              {index !== ProfileTab.Collections && index !== ProfileTab.Games && (
                <GridContainer columns={3}>
                  {isProfileTabDataLoading || isProfileInfoLoading
                    ? [
                        ...[
                          currentPage === 1
                            ? []
                            : profileTabData[index]?.results?.map((nft) => (
                                <NftCard key={nft.id} {...nft} onLikeClick={() => handleLikeClick(String(nft.id))} />
                              )),
                        ],
                        ...Array(skeletonDisplayAmount)
                          .fill('')
                          .map((_, skeletonIndex) => <NftCardSkeleton key={skeletonIndex} />),
                      ]
                    : profileTabData[index]?.results?.map((nft) => (
                        <NftCard key={nft.id} {...nft} onLikeClick={() => handleLikeClick(String(nft.id))} />
                      ))}
                </GridContainer>
              )}
              {index === ProfileTab.Collections && (
                <GridContainer columns={2}>
                  {isProfileTabDataLoading || isProfileInfoLoading
                    ? [
                        ...[
                          currentPage === 1
                            ? []
                            : collections?.map((collection) => (
                                // TODO: fix types
                                <TopCollectionCard key={collection?.url} {...(collection as any)} />
                              )),
                        ],
                        ...Array(ITEMS_PER_PAGE)
                          .fill('')
                          .map((_, skeletonIndex) => <TopCollectionCardSkeleton key={skeletonIndex} />),
                      ]
                    : collections?.map((collection) => (
                        // TODO: fix types
                        <TopCollectionCard key={collection?.url} {...(collection as any)} />
                      ))}
                </GridContainer>
              )}
            </TabPanel>
          ))}
          {(profileTabData[value]?.totalPages || 0) > currentPage && !isProfileTabDataLoading && (
            <LoadMoreButton anchorEl={ref} isLoading={isProfileTabDataLoading} onLoadMore={handleLoadMoreClick} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
