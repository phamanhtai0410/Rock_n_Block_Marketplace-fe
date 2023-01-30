import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, useTheme } from '@mui/material';
import { TopCollectionCardProps } from 'components';
import { SellersTokens } from 'components/Carousel/SellersTokens/SellersTokens';
import { NftCardProps } from 'components/NftCard';
import { SellerCardProps } from 'components/SellerCard';
import { useShallowSelector } from 'hooks';
import { ExploreNfts } from 'modules/nft/containers';
import { useWalletConnectorContext } from 'services';
import { getTopCollectionPeriod } from 'store/collections/actions';
import collectionsSelectors from 'store/collections/selectors';
import gamesSelectors from 'store/games/selectors';
import { like } from 'store/nft/actions';
import { getTrendingTokens } from 'store/nfts/actions';
import nftsSelectors from 'store/nfts/selectors';
import { follow, getHomeData } from 'store/user/actions';
import userSelector from 'store/user/selectors';
import { shortenName } from 'utils/shortenName';

import { Banner, WhatsNft } from '../../components';
import { Advantages, BackgroundBox, Games, TopCollections } from '../../containers';

import { getColor } from './Home.helper';

export const Home: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { walletService } = useWalletConnectorContext();

  const {
    topUsers,
    user: { follows, id: myId },
    chain,
  } = useShallowSelector(userSelector.getUser);
  const { favoriteTokens, trendingTokens, categories } = useShallowSelector(nftsSelectors.getNfts);
  const { topCollections, topCollectionPeriod } = useShallowSelector(collectionsSelectors.getCollections);
  const { games } = useShallowSelector(gamesSelectors.getGames);

  const [selectedTrendingType, setSelectedTrendingType] = useState('');

  const handleCategoryChange = useCallback(
    (event) => {
      dispatch(getTrendingTokens({ category: event.target.value }));
      setSelectedTrendingType(event.target.value);
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getHomeData({ web3Provider: walletService.Web3(chain.rpc) }));
    dispatch(getTopCollectionPeriod());
    // Don't refetch data on chain switch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, walletService]);

  const sellers = useMemo(
    () =>
      topUsers.map(({ user, amount }, i) => {
        const isFollowing = follows.length
          ? follows.findIndex((userFollow) => userFollow.id === user?.id) >= 0
          : undefined;
        return {
          place: i + 1,
          avatar: user?.avatar || '',
          color: getColor(i),
          currency: 'USD',
          name: shortenName(user?.name),
          tradeVolume: amount,
          isFollowing,
          myId,
          id: user?.id,
          onClick: (isFollowing2: boolean) => {
            if (user?.id) {
              dispatch(follow({ isFollowing: isFollowing2, id: user.id }));
            }
          },
        } as SellerCardProps;
      }),
    [dispatch, follows, myId, topUsers],
  );

  const handleLikeClick = useCallback(
    (id: string | number) => {
      dispatch(like({ id: id.toString() }));
    },
    [dispatch],
  );

  const featured = useMemo(
    () =>
      favoriteTokens.map(
        (favoriteToken) =>
          ({
            ...favoriteToken,
            onLikeClick: () => handleLikeClick(favoriteToken.id || 0),
          } as NftCardProps),
      ),
    [favoriteTokens, handleLikeClick],
  );

  const trending = useMemo(
    () =>
      trendingTokens.map(
        (favoriteToken) =>
          ({
            ...favoriteToken,
            onLikeClick: () => handleLikeClick(favoriteToken.id || 0),
          } as NftCardProps),
      ),
    [trendingTokens, handleLikeClick],
  );

  const categoryItems = useMemo(() => categories.map(({ name }) => ({ label: name, value: name })), [categories]);

  const collections = useMemo(
    () =>
      topCollections?.results?.map(
        (collection, index) =>
          ({
            index: index + 1,
            ...collection,
          } as TopCollectionCardProps),
      ),
    [topCollections?.results],
  );

  return (
    <>
      <BackgroundBox type="withImage" sx={{ position: 'relative', zIndex: 10 }}>
        <Banner />
      </BackgroundBox>
      <BackgroundBox type="withImage" sx={{ mb: theme.spacing(8) }}>
        <Games games={games?.results} />
        <Container sx={{ pt: theme.spacing(7), pb: theme.spacing(6) }}>
          <TopCollections collections={collections} topCollectionPeriod={topCollectionPeriod} />
        </Container>
        <SellersTokens
          sellers={sellers}
          featured={featured}
          trending={trending}
          categories={categoryItems}
          category={selectedTrendingType}
          onCategoryChange={handleCategoryChange}
        />
      </BackgroundBox>
      <BackgroundBox type="default">
        <Container sx={{ pt: theme.spacing(4) }}>
          <ExploreNfts variant="Landing" />
          <Advantages />
        </Container>
        <WhatsNft />
      </BackgroundBox>
    </>
  );
};
