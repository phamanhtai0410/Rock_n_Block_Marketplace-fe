/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ITEMS_PER_PAGE_9 } from 'appConstants';
import { NothingToShow, Spinner } from 'components';
import { Cross } from 'components/Icon/components';
import { NftCard } from 'components/NftCard';
import { NftCardSkeleton } from 'components/NftCard/components/NftCardSkeleton';
import { NumberAmount } from 'components/NumberAmount';
import {
  useConvertCurrenciesToFilters,
  useDebouncePrice,
  useLoadOnScrollNotEven,
  useShallowSelector,
  useStateParam,
  useUnmountEffect,
} from 'hooks';
import { useFilters } from 'hooks/useFilters';
import { useProperties } from 'hooks/useProperties/useProperties';
import { round } from 'lodash';
import { CollectionHeader } from 'modules/collection/components';
import { CollectionHeaderSkeleton, CollectionPropertiesSkeletons } from 'modules/collection/components/skeletons';
import { CollectionPropertiesBlock } from 'modules/collection/pages/Collection/components';
import { Filter, Filters } from 'modules/layout/containers/Filters';
import { getSplitItemPart } from 'modules/nft/containers/ExploreNfts/ExploreNfts.helpers';
import { TabPanel } from 'modules/profile/pages/Activity';
import {
  getCollectionActivity,
  getCollectionChart,
  getCollectionTradeData,
  getSingleCollection,
} from 'store/collections/actions';
import collectionsActionTypes from 'store/collections/actionTypes';
import { updateCollectionsState } from 'store/collections/reducer';
import collectionsSelectors, { selectCollectionProperties } from 'store/collections/selectors';
import { like } from 'store/nft/actions';
import { getMaxPrice, getNfts } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import { clearNfts } from 'store/nfts/reducer';
import nftsSelectors from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { RequestStatus } from 'types';
import { Standard } from 'types/api/enums';
import { GameTab } from 'types/store/games';

import { CollectionActivityChart } from './containers/CollectionActivityChart';
import { CollectionActivityTable } from './containers/CollectionActivityTable';

interface CollectionUrlParams {
  id: string;
}

const tabs = [
  { value: GameTab.Items, label: 'Items' },
  { value: GameTab.Activity, label: 'Activity' },
];

enum TimeFilter {
  Last7days = '7',
  Last14days = '14',
  Last30days = '30',
  Last60days = '60',
  Last90days = '90',
  LastYear = '365',
  AllTime = '',
}

const timeFiltersItems = [
  { value: TimeFilter.Last7days, title: 'Last 7 days' },
  { value: TimeFilter.Last14days, title: 'Last 14 days' },
  { value: TimeFilter.Last30days, title: 'Last 30 days' },
  { value: TimeFilter.Last60days, title: 'Last 60 days' },
  { value: TimeFilter.Last90days, title: 'Last 90 days' },
  { value: TimeFilter.LastYear, title: 'Last year' },
  { value: TimeFilter.AllTime, title: 'All time' },
];

export const Collection: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    [actionTypes.GET_NFTS]: fetchingNfts,
    [collectionsActionTypes.GET_COLLECTION_TRADE_DATA]: getCollectionTradeDataStatus,
    [collectionsActionTypes.GET_SINGLE_COLLECTION]: getSingleCollectionStatus,
  } = useShallowSelector(uiSelector.getUI);

  const { id: collectionId } = useParams<keyof CollectionUrlParams>() as CollectionUrlParams;
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useStateParam('tab', GameTab.Items);
  const [timeFilter, setTimeFilter] = useStateParam('time', TimeFilter.Last7days);
  const [isSales, setIsSales] = useStateParam('sales', true);
  const [isListings, setIsListings] = useStateParam('listing', false);
  const [isBids, setIsBids] = useStateParam('bids', false);
  const [isTransfers, setIsTransfers] = useStateParam('transfers', false);
  const [activityPage, setActivityPage] = useState(1);

  const isSearchNftsLoading = useMemo(() => fetchingNfts === RequestStatus.REQUEST, [fetchingNfts]);
  const isCollectionLoading = useMemo(
    () => getSingleCollectionStatus === RequestStatus.REQUEST,
    [getSingleCollectionStatus],
  );

  const collection = useShallowSelector(collectionsSelectors.getProp('singleCollection'));
  const { tokens } = useShallowSelector(userSelector.getUser);
  const properties = useShallowSelector(selectCollectionProperties);
  const { exploreNfts, maxPrice } = useShallowSelector(nftsSelectors.getNfts);
  const { collectionActivityAveragePrice, collectionActivityVolume, collectionActivity } = useShallowSelector(
    collectionsSelectors.getCollections,
  );

  const currenciesItems = useConvertCurrenciesToFilters(tokens, collection?.network.name);
  const { results, totalPages } = exploreNfts || {};
  const isErc721 = collection?.standard === Standard.ERC721;
  const filters = useFilters({ currencies: currenciesItems });
  const { activeProperties, handleSetActiveProperty } = useProperties();

  const [minPriceDebounced, maxPriceDebounced] = useDebouncePrice({
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    time: 300,
  });

  const activeCurrencySymbol = getSplitItemPart(filters.activeCurrency, '_', 0);

  const handleChange = useCallback(
    (_, newValue: GameTab = value) => {
      setValue(newValue);
    },
    [setValue, value],
  );

  const getAllNfts = useCallback(
    (page: number, shouldConcat = false) => {
      dispatch(
        getNfts({
          requestData: {
            type: 'items',
            page,
            itemsPerPage: ITEMS_PER_PAGE_9,
            properties: JSON.stringify(activeProperties),
            collections: String(collectionId),
            onAnySale: filters.onAnySale || undefined,
            orderBy: filters.orderBy,
            currency: activeCurrencySymbol,
            maxPrice: maxPriceDebounced,
            minPrice: minPriceDebounced,
            ...(filters.sellType === 'auction' && {
              onAucSale: true,
            }),
          },
          shouldConcat,
        }),
      );
    },
    [
      collectionId,
      dispatch,
      filters.activeCurrency,
      filters.orderBy,
      filters.sellType,
      filters.onAnySale,
      maxPriceDebounced,
      minPriceDebounced,
      activeProperties,
    ],
  );

  const handleLoadMoreClick = useCallback(() => {
    const nextPage = currentPage + 1;
    getAllNfts(nextPage, true);
    setCurrentPage(nextPage);
  }, [currentPage, getAllNfts]);

  const handleLikeClick = useCallback(
    (id: string) => {
      dispatch(like({ id }));
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    setActivityPage(1);
    dispatch(updateCollectionsState({ collectionActivity: null }));
  }, [dispatch]);

  const handleIsSalesChange = useCallback(() => {
    handleReset();
    setIsSales((previousIsSales) => !previousIsSales);
  }, [handleReset, setIsSales]);

  const handleIsListingsChange = useCallback(() => {
    handleReset();
    setIsListings((previousIsListing) => !previousIsListing);
  }, [handleReset, setIsListings]);

  const handleIsBidsChange = useCallback(() => {
    handleReset();
    setIsBids((previousIsBids) => !previousIsBids);
  }, [handleReset, setIsBids]);

  const handleIsTransfersChange = useCallback(() => {
    handleReset();
    setIsTransfers((previousIsTransfers) => !previousIsTransfers);
  }, [handleReset, setIsTransfers]);

  const handleClearAllClick = useCallback(async () => {
    handleReset();
    setIsSales(false);
    setIsListings(false);
    setIsBids(false);
    setIsTransfers(false);
  }, [handleReset, setIsBids, setIsListings, setIsSales, setIsTransfers]);

  const handleTimeFrameChange = useCallback(
    (e) => {
      setActivityPage(1);
      setTimeFilter(e.target.value as any);
    },
    [setTimeFilter],
  );

  const { ref } = useLoadOnScrollNotEven({ currentPage, loadMore: handleLoadMoreClick, config: {} });

  useEffect(() => {
    dispatch(
      getMaxPrice({
        currency: activeCurrencySymbol || '',
        collection: collection?.url,
      }),
    );
  }, [collection?.url, dispatch, activeCurrencySymbol]);

  useEffect(() => {
    dispatch(getCollectionTradeData({ id: collectionId, days: timeFilter }));
  }, [collectionId, dispatch, timeFilter]);

  useEffect(() => {
    dispatch(
      getCollectionActivity({
        id: collectionId,
        days: timeFilter,
        page: activityPage,
        showSales: isSales,
        showListings: isListings,
        showBids: isBids,
        showTransfers: isTransfers,
      }),
    );
  }, [activityPage, collectionId, dispatch, isBids, isListings, isSales, isTransfers, timeFilter]);

  useEffect(() => {
    dispatch(getCollectionChart({ id: collectionId, days: timeFilter }));
  }, [collectionId, dispatch, timeFilter]);

  useEffect(() => {
    getAllNfts(1);
    setCurrentPage(1);
  }, [filters.orderBy, filters.sellType, filters.onAnySale, filters.activeCurrency, getAllNfts]);

  useEffect(() => {
    dispatch(getSingleCollection({ id: collectionId }));
  }, [collectionId, dispatch]);

  useUnmountEffect(() => dispatch(clearNfts()));

  const shouldDisplayProperties = useMemo(() => !!properties.length, [properties]);

  const nftElements = useMemo(
    () =>
      results?.map((nft) => (
        <Grid
          item
          key={nft.id}
          xs={12}
          sm={shouldDisplayProperties ? 12 : 6}
          md={shouldDisplayProperties ? 6 : 4}
          lg={shouldDisplayProperties ? 4 : 3}
        >
          <NftCard {...nft} onLikeClick={() => handleLikeClick(String(nft?.id))} />
        </Grid>
      )),
    [results, handleLikeClick, shouldDisplayProperties],
  );

  return (
    <Box sx={{ textAlign: 'center' }}>
      {isCollectionLoading ? (
        <CollectionHeaderSkeleton />
      ) : (
        collection && <CollectionHeader collection={collection} id={collectionId} />
      )}
      <Box
        sx={{
          width: { xs: '100vw', md: 'auto' },
          marginTop: { xs: 8, md: 8 },
          marginBottom: 2,
          borderBottom: `1px solid ${theme.themeColors.colorTextFieldBorderDefault}`,
        }}
      >
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons={false}>
          {!collection?.isDefault && (
            <Tab
              value={GameTab.Items}
              label="Items"
              sx={{
                '&.Mui-selected': { color: theme.themeColors.colorTabItemTextActive },
                '& + &': { marginLeft: 1 },
              }}
            />
          )}

          {!collection?.isDefault && (
            <Tab
              value={GameTab.Activity}
              label="Activity"
              sx={{
                '&.Mui-selected': { color: theme.themeColors.colorTabItemTextActive },
                '& + &': { marginLeft: 1 },
              }}
            />
          )}
        </Tabs>
      </Box>

      <TabPanel value={value} index={GameTab.Items}>
        <Filters
          isDisplayAuction={isErc721}
          isDisplayCategories={false}
          filters={filters}
          maxRangePrice={maxPrice}
          currencies={currenciesItems}
          displayedFilters={{
            [Filter.Game]: false,
            [Filter.Collection]: false,
            [Filter.Network]: false,
            [Filter.Standard]: false,
          }}
        />

        <Grid container spacing={3}>
          {shouldDisplayProperties && (
            <Grid item xs={12} sm={5} md={3}>
              {isCollectionLoading ? (
                <CollectionPropertiesSkeletons />
              ) : (
                <CollectionPropertiesBlock
                  subcategoryName={collection?.subcategoryName}
                  collectionUrl={collection?.url}
                  properties={properties}
                  onPropertyClick={handleSetActiveProperty}
                  activeProperties={activeProperties}
                />
              )}
            </Grid>
          )}

          <Grid item xs={12} sm={shouldDisplayProperties ? 7 : 12} md={shouldDisplayProperties ? 9 : 12}>
            {!results?.length && !isSearchNftsLoading ? (
              <NothingToShow sx={{ mt: 1, marginBottom: 4 }} />
            ) : (
              <Grid item container spacing={shouldDisplayProperties ? 2 : 3} mb={4}>
                {isSearchNftsLoading || isCollectionLoading
                  ? [
                      ...[currentPage === 1 ? [] : nftElements],
                      ...Array(9)
                        .fill('')
                        .map((_, index) => (
                          <Grid
                            item
                            key={index}
                            xs={12}
                            sm={shouldDisplayProperties ? 12 : 6}
                            md={shouldDisplayProperties ? 6 : 4}
                            lg={shouldDisplayProperties ? 4 : 3}
                          >
                            <NftCardSkeleton />
                          </Grid>
                        )),
                    ]
                  : nftElements}
              </Grid>
            )}

            {currentPage < (totalPages || 0) && !isSearchNftsLoading && (
              <Button
                ref={ref}
                onClick={handleLoadMoreClick}
                disabled={isSearchNftsLoading}
                endIcon={isSearchNftsLoading ? <Spinner type="simple" /> : null}
                variant="outlined"
                sx={{ mb: 8 }}
              >
                Load more
              </Button>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={GameTab.Activity}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'start', md: 'center' },
              paddingBottom: 2,
              borderBottom: `1px solid ${theme.themeColors.colorTextFieldBorderDefault}`,
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                marginBottom: { xs: 2, md: 0 },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <Box
                sx={{
                  [theme.breakpoints.down('md')]: { display: 'flex', justifyContent: 'space-between' },
                  marginBottom: { xs: 1, md: 0 },
                }}
              >
                <FormControlLabel
                  checked={isSales}
                  onChange={handleIsSalesChange}
                  control={<Checkbox />}
                  label="Sales"
                  sx={{ width: { xs: 150, md: 'auto' }, marginRight: { xs: 0, md: 4 } }}
                />
                <FormControlLabel
                  checked={isListings}
                  onChange={handleIsListingsChange}
                  control={<Checkbox />}
                  label="Listings"
                  sx={{ width: { xs: 150, md: 'auto' }, marginRight: { xs: 0, md: 4 } }}
                />
              </Box>
              <Box sx={{ [theme.breakpoints.down('md')]: { display: 'flex', justifyContent: 'space-between' } }}>
                {collection?.standard !== Standard.ERC1155 && (
                  <FormControlLabel
                    checked={isBids}
                    onChange={handleIsBidsChange}
                    control={<Checkbox />}
                    label="Bids"
                    sx={{ width: { xs: 150, md: 'auto' }, marginRight: { xs: 0, md: 4 } }}
                  />
                )}
                <FormControlLabel
                  checked={isTransfers}
                  onChange={handleIsTransfersChange}
                  control={<Checkbox />}
                  label="Transfers"
                  sx={{ width: { xs: 150, md: 'auto' }, marginRight: { xs: 0, md: 4 } }}
                />
              </Box>
            </Box>
            <Button
              variant="text"
              size="small"
              onClick={handleClearAllClick}
              sx={{ color: theme.themeColors.colorDialogText, display: 'flex', justifyContent: 'start' }}
              endIcon={<Cross />}
            >
              Clear all
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              marginBottom: 3,
            }}
          >
            <Box sx={{ display: 'flex', marginBottom: { xs: 2, md: 0 } }}>
              <Typography
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 80,
                  width: { xs: '50%', md: 'auto' },
                  paddingRight: 2,
                  borderRight: `1px solid ${theme.themeColors.colorTextFieldBorderDefault}`,
                }}
              >
                <Box>{timeFilter ? `${timeFilter}-day` : `All time`} volume</Box>
                <Box component="span" sx={{ color: COLOR_PRIMARY_1, display: 'flex' }}>
                  {getCollectionTradeDataStatus === RequestStatus.REQUEST ? (
                    <>
                      <Skeleton variant="text" width={64} sx={{ backgroundColor: COLOR_PRIMARY_1, marginRight: 1 }} />
                      USD
                    </>
                  ) : (
                    <NumberAmount value={<>{collectionActivityVolume} USD</>}>
                      {round(collectionActivityVolume, 2)} USD
                    </NumberAmount>
                  )}
                </Box>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 80,
                  width: { xs: '50%', md: 'auto' },
                  paddingLeft: 2,
                }}
              >
                <Box>{timeFilter ? `${timeFilter}-day` : `All time`} average price</Box>
                <Box component="span" sx={{ color: COLOR_PRIMARY_1, display: 'flex' }}>
                  {getCollectionTradeDataStatus === RequestStatus.REQUEST ? (
                    <>
                      <Skeleton variant="text" width={64} sx={{ backgroundColor: COLOR_PRIMARY_1, marginRight: 1 }} />
                      USD
                    </>
                  ) : (
                    <NumberAmount value={<>{collectionActivityAveragePrice} USD</>}>
                      {round(collectionActivityAveragePrice, 2)} USD
                    </NumberAmount>
                  )}
                </Box>
              </Typography>
            </Box>

            <TextField
              select
              value={timeFilter}
              onChange={handleTimeFrameChange}
              sx={{ width: { xs: '100%', md: 300 }, height: 48 }}
            >
              {timeFiltersItems.map((timeFilterItem) => (
                <MenuItem key={timeFilterItem.value} value={timeFilterItem.value}>
                  {timeFilterItem.title}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {isSales && <CollectionActivityChart />}

          {(collectionActivity?.total ?? 1) >= 1 ? (
            <CollectionActivityTable activityPage={activityPage} onLoadMore={() => setActivityPage(activityPage + 1)} />
          ) : (
            <NothingToShow />
          )}
        </Box>
      </TabPanel>
    </Box>
  );
};
