import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import {
  AutocompleteProps,
  Box,
  BoxProps,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Slider,
  styled,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Spinner } from 'components';
import { ChainFilter } from 'components/ChainFilter';
import { ValueLabel } from 'components/ValueLabel';
import { useShallowSelector } from 'hooks';
import { IFilters, OrderBy } from 'hooks/useFilters';
import { DEFAULT_VALUE_FOR_ALL_OPTION, nftStandardOptions, orderByOptions } from 'hooks/useFilters/useFilters.helpers';
import { Categories } from 'modules/layout/containers/Filters/components';
import { getSplitItemPart } from 'modules/nft/containers/ExploreNfts/ExploreNfts.helpers';
import { chains } from 'services/WalletService/config';
import collectionsActionTypes from 'store/collections/actionTypes';
import gamesActionTypes from 'store/games/actionTypes';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { COLOR_NEUTRALS_3, COLOR_NEUTRALS_5 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { TextFieldLabel } from 'theme/variables';
import { RequestStatus } from 'types';
import { GameList } from 'types/store/games';
import { flexHelper } from 'utils';

import { AdvancedFiltersPopup } from '../AdvancedFiltersPopup';

import { CollectionSelect } from './components/CollectionSelect';
import { ICategory, ICollection, ICurrency } from './Filters.types';

export const TextFieldWithLabel = styled(Box)(() => ({
  width: '100%',
}));

export const ResetButton = styled(Button)(() => ({
  padding: 0,
  justifyContent: 'flex-end',
  color: COLOR_NEUTRALS_5,
  textTransform: 'uppercase',
  fontWeight: FontWeights.fontWeightMedium,
  fontSize: '12px',
}));

export enum Filter {
  Standard = 'Standard',
  Collection = 'Collection',
  Price = 'Price',
  Currency = 'Currency',
  Network = 'Network',
  Game = 'Game',
}

export type CollectionValue = {
  label: string;
  value: string;
};

export interface FiltersProps {
  isDisplayCategories?: boolean;
  isDisplayAuction?: boolean;
  filters: IFilters;
  games?: GameList['results'];
  categories?: Array<ICategory>;
  collections?: ICollection[];
  currencies?: ICurrency[];
  maxRangePrice?: number;
  displayedFilters?: Partial<Record<Filter, boolean>>;
  collectionInputValue?: string;
  onCollectionInputValueChange?: AutocompleteProps<CollectionValue, false, false, false>['onInputChange'];
  onCollectionLoadMore?: () => void;
  gameInputValue?: string;
  onGameInputValueChange?: AutocompleteProps<CollectionValue, false, false, false>['onInputChange'];
  onGameLoadMore?: () => void;
}

export const Filters: FC<FiltersProps & BoxProps> = ({
  isDisplayCategories = true,
  isDisplayAuction = true,
  filters,
  categories,
  games,
  collections,
  currencies,
  maxRangePrice,
  displayedFilters,
  collectionInputValue,
  onCollectionInputValueChange,
  onCollectionLoadMore,
  gameInputValue,
  onGameInputValueChange,
  onGameLoadMore,
  ...boxProps
}) => {
  const theme = useTheme();
  const {
    [actionTypes.GET_MAX_PRICE]: fetchingMaxPrice,
    [collectionsActionTypes.GET_COLLECTIONS]: getCollectionsStatus,
    [gamesActionTypes.GET_FILTER_GAMES]: getFilterGamesStatus,
  } = useShallowSelector(uiSelector.getUI);

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
  const activeCollectionId = getSplitItemPart(activeCollection, '_', 0);
  const activeCollectionLabel = getSplitItemPart(activeCollection, '_', 1);
  const activeGameId = getSplitItemPart(game, '_', 0);
  const activeGameLabel = getSplitItemPart(game, '_', 1);

  const [collectionOption, setCollectionOption] = useState<CollectionValue | null>(
    activeCollection ? { value: activeCollectionId, label: activeCollectionLabel } : null,
  );
  const [gameOption, setGameOption] = useState<CollectionValue | null>(
    game ? { value: activeGameId, label: activeGameLabel } : null,
  );

  const isMobileFilters = useMediaQuery(theme.breakpoints.down('sm'));
  const [isMoreFilters, setIsMoreFilters] = useState({ isMobile: false, isDesktop: true });

  const selectedGame = useMemo(
    () => games?.find((gameItem) => `${gameItem.id}` === activeGameId),
    [activeGameId, games],
  );
  const collectionOptions = useMemo(
    () =>
      collections?.map(
        ({ title, value }) =>
          ({
            label: title,
            value,
          } as CollectionValue),
      ) || [],
    [collections],
  );
  const currencyOptions = useMemo(
    () =>
      currencies
        ?.filter(({ network }) => (activeNetwork ? activeNetwork === network : true))
        ?.filter(({ network }) => (selectedGame ? selectedGame?.network?.name === network : true))
        ?.filter(({ value }) => (sellType === 'auction' ? value !== 'ETH' : value)),
    [activeNetwork, currencies, selectedGame, sellType],
  );
  const gameOptions = useMemo(
    () => [
      { label: 'All games', value: '0' } as CollectionValue,
      ...(games?.map(
        (gameOptionItem) => ({ label: gameOptionItem.name ?? '', value: `${gameOptionItem.id}` } as CollectionValue),
      ) || []),
    ],
    [games],
  );

  const activeCurrencySymbol = getSplitItemPart(activeCurrency, '_', 0);
  const activeCurrencyNetwork = getSplitItemPart(activeCurrency, '_', 1);
  const isLoadingMaxPrice = fetchingMaxPrice === RequestStatus.REQUEST;
  const shouldRenderResetButton = !!minPrice || !!maxPrice;
  const displayedFiltersAll = {
    [Filter.Standard]: true,
    [Filter.Collection]: true,
    [Filter.Price]: true,
    [Filter.Currency]: true,
    [Filter.Network]: true,
    [Filter.Game]: true,
    ...displayedFilters,
  };

  const handleCollectionValueChange: AutocompleteProps<CollectionValue, false, false, false>['onChange'] = useCallback(
    (_, newCollection: CollectionValue | null) => {
      setCollectionOption(newCollection);
      handleChangeFilter('activeCollection', newCollection ? `${newCollection?.value}_${newCollection?.label}` : '');
    },
    [handleChangeFilter],
  );

  const handleGameValueChange: AutocompleteProps<CollectionValue, false, false, false>['onChange'] = useCallback(
    (_, newGame: CollectionValue | null) => {
      setGameOption(newGame);
      handleChangeFilter('game', newGame ? `${newGame?.value}_${newGame?.label}` : '');
    },
    [handleChangeFilter],
  );

  const toggleIsMoreFilters = useCallback(
    (key: 'isDesktop' | 'isMobile') => {
      setIsMoreFilters((previousIsMoreFilters) => ({
        ...previousIsMoreFilters,
        [key]: !previousIsMoreFilters[key],
      }));
    },
    [setIsMoreFilters],
  );

  const handleResetPrice = useCallback(() => {
    handleChangeFilter('minPrice', '');
    handleChangeFilter('maxPrice', '');
  }, [handleChangeFilter]);

  const handleChangeActiveCategory = useCallback(
    (value) => {
      handleChangeFilter('activeCategory', value);
      handleChangeFilter('game', DEFAULT_VALUE_FOR_ALL_OPTION);
    },
    [handleChangeFilter],
  );

  const handleChangeNetwork = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      handleChangeFilter('activeNetwork', e.target.value);

      // Reset collection/currency if not in selected network
      if (activeCurrencyNetwork !== e.target.value) {
        handleChangeFilter('activeCurrency', DEFAULT_VALUE_FOR_ALL_OPTION);
      }
      if (collections?.find((collection) => collection.value === activeCollection)?.network !== e.target.value) {
        handleChangeFilter('activeCollection', DEFAULT_VALUE_FOR_ALL_OPTION);
      }
    },
    [handleChangeFilter, collections, activeCurrencyNetwork, activeCollection],
  );

  const handleCloseMobilePopup = useCallback(() => {
    setIsMoreFilters((previousIsMoreFilters) => ({
      ...previousIsMoreFilters,
      isMobile: false,
    }));
  }, []);

  return (
    <>
      {isMobileFilters && (
        <AdvancedFiltersPopup
          maxRangePrice={maxRangePrice}
          currencies={currencies || []}
          collections={collections || []}
          open={isMoreFilters.isMobile}
          filters={filters}
          onClose={handleCloseMobilePopup}
          onCollectionLoadMore={onCollectionLoadMore}
          collectionInputValue={collectionInputValue}
          onCollectionInputValueChange={onCollectionInputValueChange}
          displayedFilters={displayedFiltersAll}
          isLoadingMaxPrice={isLoadingMaxPrice}
          gameOption={gameOption}
          handleGameValueChange={handleGameValueChange}
          gameOptions={gameOptions}
          selectedGame={selectedGame}
          gameInputValue={gameInputValue}
          onGameInputValueChange={onGameInputValueChange}
          onGameLoadMore={onGameLoadMore}
        />
      )}

      <Box
        sx={{
          transition: '0.4s ease',
          mb: isMoreFilters.isDesktop ? 3 : 0,
        }}
      >
        {isDisplayCategories && (
          <Categories
            onChangeActiveCategory={handleChangeActiveCategory}
            activeCategory={activeCategory}
            categories={categories}
          />
        )}

        <Box
          sx={{
            ...flexHelper('space-between'),
            mt: 4,
            gap: 4,
            pb: 4,
            mb: 3,
            borderBottom: `1px solid ${COLOR_NEUTRALS_3}`,
            [theme.breakpoints.down(750)]: {
              gap: 0,
            },
            [theme.breakpoints.down(600)]: {
              borderBottom: 'none',
              gap: 4,
              pb: 0,
              flexDirection: 'column',
            },
            ...boxProps,
          }}
        >
          <Box
            sx={{
              ...flexHelper('space-between'),
              gap: 4,
              [theme.breakpoints.down(600)]: {
                width: '100%',
              },
            }}
          >
            <TextField
              value={orderBy}
              onChange={(e) => handleChangeFilter('orderBy', e.target.value as OrderBy)}
              select
              sx={{
                width: '180px',
                [theme.breakpoints.down(600)]: {
                  width: '100%',
                },
              }}
            >
              {orderByOptions.map(({ value, title }) => (
                <MenuItem key={value} value={value}>
                  {title}
                </MenuItem>
              ))}
            </TextField>
            {isDisplayAuction && (
              <FormControlLabel
                sx={{
                  [theme.breakpoints.down(600)]: {
                    display: 'none',
                  },
                }}
                control={
                  <Checkbox
                    checked={sellType === 'auction'}
                    onChange={() => handleChangeFilter('sellType', sellType === 'auction' ? '' : 'auction')}
                  />
                }
                label="Auction"
              />
            )}
            <FormControlLabel
              sx={{
                [theme.breakpoints.down(600)]: {
                  display: 'none',
                },
              }}
              control={
                <Checkbox
                  checked={onAnySale === 'sale'}
                  onChange={() => handleChangeFilter('onAnySale', onAnySale === 'sale' ? '' : 'sale')}
                />
              }
              label="For sale"
            />
          </Box>
          <Button
            sx={{
              textTransform: 'capitalize',
              width: { xs: '100%', sm: 'fit-content' },
            }}
            variant={isMoreFilters[isMobileFilters ? 'isMobile' : 'isDesktop'] ? 'contained' : 'outlined'}
            onClick={() => toggleIsMoreFilters(isMobileFilters ? 'isMobile' : 'isDesktop')}
          >
            Advanced Filters
          </Button>
        </Box>
        <Box
          sx={{
            transition: isMoreFilters.isDesktop
              ? 'max-height 1s ease-in-out, opacity 1s ease-in-out'
              : 'max-height 0.5s cubic-bezier(0, 1, 0, 1), opacity 0.5s cubic-bezier(0, 1, 0, 1)',
            overflow: isMoreFilters.isDesktop ? 'visible' : 'hidden',
            maxHeight: isMoreFilters.isDesktop ? '375px' : 0,
            opacity: isMoreFilters.isDesktop ? '1' : 0,
          }}
        >
          <Box
            sx={{
              marginBottom: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 0.25fr)',
              gridGap: '32px',
              [theme.breakpoints.down(800)]: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              },
              [theme.breakpoints.down(600)]: {
                display: 'none',
              },
            }}
          >
            {displayedFiltersAll[Filter.Standard] && (
              <TextFieldWithLabel>
                <TextFieldLabel isRegular>NFT STANDARD</TextFieldLabel>
                <TextField
                  value={nftStandard}
                  onChange={(event) => handleChangeFilter('nftStandard', event.target.value)}
                  select
                  sx={{ width: '100%', height: 52 }}
                >
                  {nftStandardOptions.map(({ value, title }) => (
                    <MenuItem key={value} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </TextFieldWithLabel>
            )}

            {displayedFiltersAll[Filter.Collection] && (
              <TextFieldWithLabel>
                <TextFieldLabel isRegular>COLLECTION</TextFieldLabel>
                <CollectionSelect
                  options={collectionOptions}
                  value={collectionOption}
                  onChange={handleCollectionValueChange}
                  inputValue={collectionInputValue}
                  onInputChange={isMobileFilters ? undefined : onCollectionInputValueChange}
                  onScrollEnd={onCollectionLoadMore}
                  isLoading={getCollectionsStatus === RequestStatus.REQUEST}
                />
              </TextFieldWithLabel>
            )}

            {displayedFiltersAll[Filter.Currency] && (
              <TextFieldWithLabel>
                <TextFieldLabel isRegular>CURRENCY</TextFieldLabel>
                <TextField
                  onChange={(e) => handleChangeFilter('activeCurrency', e.target.value)}
                  value={activeCurrency}
                  select
                  sx={{ width: '100%', height: 52 }}
                >
                  <MenuItem value={DEFAULT_VALUE_FOR_ALL_OPTION} sx={{ marginBottom: 0.5 }}>
                    All Currencies
                  </MenuItem>
                  {currencyOptions?.map(({ value, network, title }) => (
                    <MenuItem
                      key={value}
                      value={value}
                      sx={{ display: 'flex', alignItems: 'center', marginBottom: 0.5 }}
                    >
                      <Box
                        component="img"
                        src={chains[network].mainnet.img}
                        sx={{ width: 24, height: 24, marginRight: 1 }}
                      />
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </TextFieldWithLabel>
            )}
            <TextFieldWithLabel sx={{ pr: 0.5 }}>
              <TextFieldLabel isRegular sx={{ ...flexHelper('space-between', 'center') }}>
                PRICE RANGE
                {shouldRenderResetButton && (
                  <ResetButton variant="text" className="withoutHover" onClick={handleResetPrice}>
                    Reset
                  </ResetButton>
                )}
              </TextFieldLabel>
              <Slider
                value={minPrice && maxPrice ? [+minPrice, +maxPrice] : [0, 0]}
                onChange={(_, values) => {
                  const [newMinPrice, newMaxPrice] = Array.isArray(values) ? values : [0, 0];
                  handleChangeFilter('minPrice', newMinPrice.toString());
                  handleChangeFilter('maxPrice', newMaxPrice.toString());
                }}
                min={0}
                getAriaLabel={() => 'price-range'}
                max={maxRangePrice}
                marks={
                  isLoadingMaxPrice
                    ? [
                        {
                          label: <Spinner type="simple" />,
                          value: 0,
                        },
                        { label: <Spinner type="simple" />, value: 0 },
                      ]
                    : [
                        {
                          label: `0 ${activeCurrencySymbol || '$'}`,
                          value: 0,
                        },
                        {
                          label: `${maxRangePrice} ${activeCurrencySymbol || '$'}`,
                          value: maxRangePrice || 1,
                        },
                      ]
                }
                components={{
                  // eslint-disable-next-line react/no-unstable-nested-components
                  ValueLabel: (props) => <ValueLabel {...props} symbol={activeCurrencySymbol || '$'} />,
                }}
              />
            </TextFieldWithLabel>
            {displayedFiltersAll[Filter.Network] && (
              <TextFieldWithLabel>
                <TextFieldLabel isRegular>NETWORK</TextFieldLabel>
                <ChainFilter
                  value={activeNetwork}
                  onChange={(e) => handleChangeNetwork(e)}
                  sx={{ width: '100%', height: 52 }}
                />
              </TextFieldWithLabel>
            )}
            {displayedFiltersAll[Filter.Game] && !activeCategory && (
              <TextFieldWithLabel>
                <TextFieldLabel isRegular>Game</TextFieldLabel>

                <CollectionSelect
                  options={gameOptions}
                  value={gameOption}
                  onChange={handleGameValueChange}
                  inputValue={gameInputValue}
                  onInputChange={isMobileFilters ? undefined : onGameInputValueChange}
                  onScrollEnd={onGameLoadMore}
                  isLoading={getFilterGamesStatus === RequestStatus.REQUEST}
                />
              </TextFieldWithLabel>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
