import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AutocompleteProps, Box, Button, useTheme } from '@mui/material';
import { ITEMS_PER_PAGE_8, routes } from 'appConstants';
import { LoadMoreButton, NftElementsContainer, NothingToShow } from 'components';
import { ArrowLeft } from 'components/Icon/components';
import { NftCard } from 'components/NftCard';
import { useConvertCurrenciesToFilters, useDebouncePrice, useLoadOnScrollNotEven, useShallowSelector } from 'hooks';
import { useFilters } from 'hooks/useFilters';
import { DEFAULT_VALUE_FOR_ALL_OPTION } from 'hooks/useFilters/useFilters.helpers';
import { CollectionValue, Filter, Filters } from 'modules/layout/containers/Filters';
import { ExploreTitle } from 'modules/nft/containers/ExploreNfts/components';
import { useWalletConnectorContext } from 'services';
import { getCollections } from 'store/collections/actions';
import collectionsSelectors, { selectCollectionItems } from 'store/collections/selectors';
import { getFilterGames } from 'store/games/actions';
import gamesSelectors from 'store/games/selectors';
import { like } from 'store/nft/actions';
import { getMaxPrice, getNfts } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelectors, { selectCategoryItems } from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import { getExploreData } from 'store/user/actions';
import userSelector from 'store/user/selectors';
import { RequestStatus } from 'types';
import { flexHelper } from 'utils';

import { getSplitItemPart, VariantProps, VariantValues } from './ExploreNfts.helpers';

type ExploreNftsProps = {
  variant?: VariantProps;
};

export const ExploreNfts: FC<ExploreNftsProps> = ({ variant = 'Explore' }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { collectionId } = useParams<{ collectionId: string }>();
  const { tokens } = useShallowSelector(userSelector.getUser);
  const { exploreNfts, maxPrice: maxNftPrice } = useShallowSelector(nftsSelectors.getNfts);
  const { totalCollectionPages } = useShallowSelector(collectionsSelectors.getCollections);
  const { [actionTypes.GET_NFTS]: getNftsRequestStatus } = useShallowSelector(uiSelector.getUI);
  const { chain } = useShallowSelector(userSelector.getUser);
  const { filterGames, totalFilterGamesPages } = useShallowSelector(gamesSelectors.getGames);
  const categoryItems = useShallowSelector(selectCategoryItems);
  const collectionsItems = useShallowSelector(selectCollectionItems);

  const [collectionInputValue, setCollectionInputValue] = useState('');
  const [collectionsPage, setCollectionsPage] = useState(1);
  const [gameInputValue, setGameInputValue] = useState('');
  const [gamePage, setGamePage] = useState(1);
  const [page, setPage] = useState(1);

  const currenciesItems = useConvertCurrenciesToFilters(
    tokens,
    variant === VariantValues.Mixed ? collectionsItems?.[0]?.network : '',
  );
  const filters = useFilters({
    currencies: currenciesItems,
    defaultNetwork: '',
  });

  const {
    activeCategory,
    activeCurrency,
    activeCollection,
    orderBy,
    nftStandard,
    sellType,
    game,
    maxPrice,
    minPrice,
    activeNetwork,
    onAnySale,
    handleChangeFilter,
  } = filters;

  const currencySymbol = getSplitItemPart(activeCurrency, '_', 0);
  const currencyNetwork = getSplitItemPart(activeCurrency, '_', 1);
  const gameId = getSplitItemPart(filters.game, '_', 0);
  const activeCollectionId = getSplitItemPart(activeCollection, '_', 0);
  const selectedGame = useMemo(
    () => filterGames?.find((gameOption) => `${gameOption.id}` === gameId),
    [gameId, filterGames],
  );
  const [minPriceDebounced, maxPriceDebounced] = useDebouncePrice({
    minPrice,
    maxPrice,
    time: 300,
  });
  const isNftsLoading = getNftsRequestStatus === RequestStatus.REQUEST;

  const handleCollectionInputValueChange: AutocompleteProps<CollectionValue, false, false, false>['onInputChange'] =
    useCallback((_, newInputValue: string) => {
      setCollectionsPage(1);
      setCollectionInputValue(newInputValue);
    }, []);

  const handleGameInputValueChange: AutocompleteProps<CollectionValue, false, false, false>['onInputChange'] =
    useCallback((_, newInputValue: string) => {
      setGamePage(1);
      setGameInputValue(newInputValue);
    }, []);

  const handleGetNfts = useCallback(() => {
    setPage((previousPage) => previousPage + 1);
  }, []);

  type handleChangeFilterParameters = Parameters<typeof handleChangeFilter>;

  const handleChangeExploreFilter = useCallback(
    (filterName: handleChangeFilterParameters[0], filterValue: handleChangeFilterParameters[1]) => {
      handleChangeFilter(filterName, filterValue);
      setPage(1);
    },
    [handleChangeFilter],
  );

  const handleLikeClick = useCallback(
    (id: string | number) => {
      dispatch(like({ id: id.toString() }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (variant !== VariantValues.Mixed) {
      dispatch(getExploreData({ web3Provider: walletService.Web3(chain.rpc) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, walletService, maxNftPrice]);

  useEffect(() => {
    // filters.handleChangeFilter('activeCollection', DEFAULT_VALUE_FOR_ALL_OPTION);
    dispatch(
      getCollections({
        id: activeCategory,
        text: collectionInputValue,
        page: collectionsPage,
        itemsPerPage: ITEMS_PER_PAGE_8,
        ...(filters.game && { game: gameId }),
        ...(variant === VariantValues.Mixed && { relatedCollections: collectionId }),
        ...(filters.activeNetwork && { network: filters.activeNetwork }),
        ...(selectedGame?.network?.name && { network: selectedGame?.network?.name }),
      }),
    );
  }, [
    dispatch,
    collectionInputValue,
    activeCategory,
    collectionsPage,
    filters.activeNetwork,
    gameId,
    selectedGame,
    variant,
    collectionId,
    filters.game,
  ]);

  useEffect(() => {
    dispatch(
      getFilterGames({
        text: gameInputValue,
        page: gamePage,
        itemsPerPage: ITEMS_PER_PAGE_8,
        ...(filters.activeNetwork && { network: filters.activeNetwork }),
      }),
    );
  }, [dispatch, gameInputValue, gamePage, filters.activeNetwork]);

  useEffect(() => {
    filters.handleChangeFilter('maxPrice', DEFAULT_VALUE_FOR_ALL_OPTION);
    dispatch(
      getMaxPrice({
        currency: currencySymbol,
        ...(variant === VariantValues.Mixed && { collection: collectionId }),
        ...(currencyNetwork && { network: currencyNetwork }),
        ...(selectedGame?.network?.name && { network: selectedGame?.network?.name }),
        ...(filters.activeNetwork && { network: filters.activeNetwork }),
        ...(filters.activeCollection && { collection: activeCollectionId }),
        ...(filters.game && { game: gameId }),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    activeCurrency,
    variant,
    currencyNetwork,
    selectedGame?.network?.name,
    filters.activeNetwork,
    activeCollectionId,
    gameId,
  ]);

  const { ref } = useLoadOnScrollNotEven({
    currentPage: page,
    loadMore: handleGetNfts,
    config: {},
  });

  useEffect(() => {
    dispatch(
      getNfts({
        requestData: {
          page,
          categories: activeCategory,
          orderBy,
          onAucSale: sellType === 'auction' || undefined,
          onAnySale: onAnySale || undefined,
          network: activeNetwork || currencyNetwork,
          standard: nftStandard as any,
          ...(variant === VariantValues.Mixed ? { relatedCollections: collectionId } : {}),
          collections: activeCollectionId,
          currency: currencySymbol,
          maxPrice: maxPriceDebounced,
          minPrice: minPriceDebounced,
          game: gameId,
          itemsPerPage: ITEMS_PER_PAGE_8,
        },
        shouldConcat: page !== 1,
      }),
    );
  }, [
    dispatch,
    activeCategory,
    activeCollection,
    activeCurrency,
    maxPriceDebounced,
    minPriceDebounced,
    nftStandard,
    orderBy,
    sellType,
    onAnySale,
    activeNetwork,
    gameId,
    page,
    currencyNetwork,
    variant,
    currencySymbol,
    activeCollectionId,
    collectionId,
  ]);

  const nftElements = useMemo(
    () =>
      exploreNfts?.results?.map((nft) => (
        <NftCard key={nft.id} onLikeClick={() => handleLikeClick(String(nft?.id))} {...nft} />
      )),
    [exploreNfts?.results, handleLikeClick],
  );

  return (
    <Box>
      <ExploreTitle variant={variant} />
      <Filters
        filters={{ ...filters, handleChangeFilter: handleChangeExploreFilter }}
        categories={categoryItems}
        games={filterGames || []}
        collections={collectionsItems}
        currencies={currenciesItems}
        maxRangePrice={maxNftPrice}
        onCollectionLoadMore={() =>
          collectionsPage < totalCollectionPages &&
          setCollectionsPage((previousCollectionPage) => previousCollectionPage + 1)
        }
        collectionInputValue={collectionInputValue}
        onCollectionInputValueChange={handleCollectionInputValueChange}
        gameInputValue={gameInputValue}
        onGameInputValueChange={handleGameInputValueChange}
        onGameLoadMore={() =>
          gamePage < totalFilterGamesPages && setGamePage((previousGamePage) => previousGamePage + 1)
        }
        isDisplayCategories={!(variant === VariantValues.Mixed)}
        displayedFilters={{
          [Filter.Game]: variant !== VariantValues.Mixed,
          [Filter.Network]: variant !== VariantValues.Mixed,
        }}
      />
      {!exploreNfts?.results?.length && !isNftsLoading ? (
        <NothingToShow sx={{ marginBottom: 4 }} />
      ) : (
        <NftElementsContainer nftElements={nftElements} isLoading={isNftsLoading} page={page} />
      )}
      <Box sx={{ ...flexHelper(), mb: theme.spacing(7) }}>
        {variant === VariantValues.Landing ? (
          <Link to={routes.explore.root.path}>
            <Button
              sx={{ p: theme.spacing(1.5, 2), fontSize: '14px' }}
              variant="outlined"
              endIcon={<ArrowLeft style={{ transform: 'rotate(180deg)' }} />}
            >
              Go to Explore page
            </Button>
          </Link>
        ) : (
          page < (exploreNfts?.totalPages || Infinity) &&
          !isNftsLoading && <LoadMoreButton anchorEl={ref} isLoading={isNftsLoading} onLoadMore={handleGetNfts} />
        )}
      </Box>
    </Box>
  );
};
