import { FC, useCallback, useMemo, useState } from 'react';
import {
  AutocompleteProps,
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  MenuItem,
  Slider,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Icon, Spinner } from 'components';
import { ChainFilter } from 'components/ChainFilter';
import { ValueLabel } from 'components/ValueLabel';
import { useShallowSelector } from 'hooks';
import { IFilters } from 'hooks/useFilters';
import { DEFAULT_VALUE_FOR_ALL_OPTION, nftStandardOptions } from 'hooks/useFilters/useFilters.helpers';
import { getSplitItemPart } from 'modules/nft/containers/ExploreNfts/ExploreNfts.helpers';
import { chains } from 'services/WalletService/config';
import collectionsActionTypes from 'store/collections/actionTypes';
import gamesActionTypes from 'store/games/actionTypes';
import uiSelector from 'store/ui/selectors';
import { FontWeights } from 'theme/Typography';
import { TextFieldLabel } from 'theme/variables';
import { RequestStatus } from 'types';
import { GameCompanyList } from 'types/api/GameCompanyList';
import { flexHelper } from 'utils';

import { CollectionValue, Filter, ResetButton, TextFieldWithLabel } from '../Filters';
import { CollectionSelect } from '../Filters/components/CollectionSelect';
import { ICollection, ICurrency } from '../Filters/Filters.types';

export interface AdvancedFiltersPopupProps {
  open: boolean;
  onClose: () => void;
  collections: Array<ICollection>;
  currencies: Array<ICurrency>;
  maxRangePrice?: number;
  filters: IFilters;
  onCollectionLoadMore?: () => void;
  collectionInputValue?: string;
  onCollectionInputValueChange?: AutocompleteProps<CollectionValue, false, false, false>['onInputChange'];
  isLoadingMaxPrice?: boolean;
  displayedFilters: Partial<Record<Filter, boolean>>;

  gameOption: CollectionValue | null;
  handleGameValueChange: AutocompleteProps<CollectionValue, false, false, false>['onChange'];
  gameOptions: CollectionValue[];
  selectedGame?: GameCompanyList;
  gameInputValue?: string;
  onGameInputValueChange?: AutocompleteProps<CollectionValue, false, false, false>['onInputChange'];
  onGameLoadMore: (() => void) | undefined;
}

export enum LocalFilters {
  localNftStandard = 'localNftStandard',
  localSellType = 'localSellType',
  localOnAnySale = 'localOnAnySale',
  localMinPrice = 'localMinPrice',
  localMaxPrice = 'localMaxPrice',
}

export const AdvancedFiltersPopup: FC<AdvancedFiltersPopupProps> = ({
  open,
  onClose,
  maxRangePrice,
  collections,
  currencies,
  filters,
  onCollectionLoadMore,
  collectionInputValue,
  onCollectionInputValueChange,
  displayedFilters,
  isLoadingMaxPrice,

  gameOption,
  handleGameValueChange,
  gameOptions,
  selectedGame,
  gameInputValue,
  onGameInputValueChange,
  onGameLoadMore,
}) => {
  const {
    handleChangeFilter,
    activeCurrency,
    nftStandard,
    activeCollection,
    activeNetwork,
    sellType,
    onAnySale,
    minPrice,
    maxPrice,
    game,
  } = filters;

  const theme = useTheme();
  const {
    [collectionsActionTypes.GET_COLLECTIONS]: getCollectionsStatus,
    [gamesActionTypes.GET_FILTER_GAMES]: getFilterGamesStatus,
  } = useShallowSelector(uiSelector.getUI);

  const [localFiltersState, setLocalFiltersState] = useState<Record<LocalFilters, string | any>>({
    localNftStandard: nftStandard,
    localSellType: sellType,
    localOnAnySale: onAnySale,
    localMinPrice: minPrice,
    localMaxPrice: maxPrice,
  });

  const { localNftStandard, localMaxPrice, localMinPrice, localSellType, localOnAnySale } = localFiltersState;

  const activeCurrencySymbol = getSplitItemPart(activeCurrency, '_', 0);
  const activeCurrencyNetwork = getSplitItemPart(activeCurrency, '_', 1);
  const activeCollectionId = getSplitItemPart(activeCollection, '_', 0);
  const activeCollectionLabel = getSplitItemPart(activeCollection, '_', 1);
  const [collectionOption, setCollectionOption] = useState<CollectionValue | null>(
    activeCollection ? { value: activeCollectionId, label: activeCollectionLabel } : null,
  );
  const activeGameId = getSplitItemPart(game, '_', 0);
  const activeGameLabel = getSplitItemPart(game, '_', 1);

  const collectionOptions = useMemo(
    () =>
      collections
        ?.filter(({ network }) => (activeNetwork ? network === activeNetwork : true))
        ?.map(
          ({ title, value }) =>
            ({
              label: title,
              value,
            } as CollectionValue),
        ) || [],
    [activeNetwork, collections],
  );
  const currencyOptions = useMemo(
    () =>
      currencies
        ?.filter(({ network }) => (activeNetwork ? network === activeNetwork : true))
        ?.filter(({ network }) => (selectedGame ? network === selectedGame?.network?.name : true))
        ?.filter(({ value }) => (sellType === 'auction' ? value !== 'ETH' : value)),
    [activeNetwork, currencies, selectedGame, sellType],
  );

  const shouldRenderResetButton = !!localMinPrice || !!localMaxPrice;

  const handleSetLocalState = useCallback((value: string, key: keyof typeof LocalFilters) => {
    setLocalFiltersState((prevState) => {
      return { ...prevState, [key]: value };
    });
  }, []);

  const handleCollectionValueChange: AutocompleteProps<CollectionValue, false, false, false>['onChange'] = useCallback(
    (_, newCollection: CollectionValue | null) => {
      setCollectionOption(newCollection);
      handleChangeFilter('activeCollection', newCollection ? `${newCollection?.value}_${newCollection?.label}` : '');
    },
    [handleChangeFilter],
  );

  const handleApplyClick = () => {
    handleChangeFilter('nftStandard', localNftStandard);
    handleChangeFilter('minPrice', localMinPrice);
    handleChangeFilter('maxPrice', localMaxPrice);
    handleChangeFilter('sellType', localSellType);
    handleChangeFilter('onAnySale', localOnAnySale);
    onClose();
  };

  const handleResetPrice = useCallback(() => {
    handleSetLocalState('', LocalFilters.localMinPrice);
    handleSetLocalState('', LocalFilters.localMaxPrice);
  }, [handleSetLocalState]);

  return (
    <Dialog
      PaperProps={{ sx: { background: theme.themeColors.colorBackground, borderRadius: 0 } }}
      fullScreen
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          padding: theme.spacing(6, 4),
        }}
      >
        <Button
          sx={{
            mb: 3,
          }}
          onClick={onClose}
          variant="outlined"
          startIcon={<Icon.ArrowLeft />}
        >
          Back
        </Button>
        <Typography sx={{ mb: 4 }} fontSize="32px" fontWeight={FontWeights.fontWeightSemiBold}>
          Advanced filter
        </Typography>
        <>
          {displayedFilters[Filter.Standard] && (
            <TextFieldWithLabel sx={{ mb: 3 }}>
              <TextFieldLabel isRegular>Nft standard</TextFieldLabel>
              <TextField
                onChange={(e) => handleSetLocalState(e.target.value, LocalFilters.localNftStandard)}
                value={localNftStandard}
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

          {displayedFilters[Filter.Collection] && (
            <TextFieldWithLabel sx={{ mb: 3 }}>
              <TextFieldLabel isRegular>Collection</TextFieldLabel>
              <CollectionSelect
                options={collectionOptions}
                value={collectionOption}
                onChange={handleCollectionValueChange}
                inputValue={collectionInputValue}
                onInputChange={onCollectionInputValueChange}
                onScrollEnd={onCollectionLoadMore}
                isLoading={getCollectionsStatus === RequestStatus.REQUEST}
              />
            </TextFieldWithLabel>
          )}

          {displayedFilters[Filter.Currency] && (
            <TextFieldWithLabel sx={{ mb: 3 }}>
              <TextFieldLabel isRegular>Currency</TextFieldLabel>
              <TextField
                value={activeCurrency}
                onChange={(e) => {
                  handleChangeFilter('activeCurrency', e.target.value); // change filter directly because of currency in price range
                }}
                select
                sx={{ width: '100%', height: 52 }}
              >
                <MenuItem value={DEFAULT_VALUE_FOR_ALL_OPTION}>All Currencies</MenuItem>
                {currencyOptions.map(({ value, network, title }) => (
                  <MenuItem key={value} value={value} sx={{ display: 'flex', alignItems: 'center', marginBottom: 0.5 }}>
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

          {displayedFilters[Filter.Network] && (
            <TextFieldWithLabel sx={{ mb: 3 }}>
              <TextFieldLabel isRegular>NETWORK</TextFieldLabel>
              <ChainFilter
                value={activeNetwork}
                onChange={(e) => {
                  handleChangeFilter('activeNetwork', e.target.value);
                  if (activeCurrencyNetwork !== e.target.value) {
                    handleChangeFilter('activeCurrency', DEFAULT_VALUE_FOR_ALL_OPTION);
                  }
                  if (
                    collections?.find((collection) => collection.value === activeCollectionId)?.network !==
                    e.target.value
                  ) {
                    handleChangeFilter('activeCollection', DEFAULT_VALUE_FOR_ALL_OPTION);
                  }
                }}
                sx={{ width: '100%', height: 52 }}
              />
            </TextFieldWithLabel>
          )}

          {displayedFilters[Filter.Game] && (
            <TextFieldWithLabel sx={{ mb: 5 }}>
              <TextFieldLabel isRegular>Game</TextFieldLabel>

              {/* TODO: rewrite using local state in the future */}
              <CollectionSelect
                options={gameOptions}
                value={gameOption}
                onChange={handleGameValueChange}
                inputValue={gameInputValue}
                onInputChange={onGameInputValueChange}
                onScrollEnd={onGameLoadMore}
                isLoading={getFilterGamesStatus === RequestStatus.REQUEST}
              />
            </TextFieldWithLabel>
          )}

          <TextFieldWithLabel sx={{ mb: 5 }}>
            <TextFieldLabel isRegular sx={{ ...flexHelper('space-between', 'center') }}>
              PRICE RANGE
              {shouldRenderResetButton && (
                <ResetButton variant="text" onClick={handleResetPrice}>
                  Reset
                </ResetButton>
              )}
            </TextFieldLabel>
            <Slider
              value={localMinPrice && localMaxPrice ? [+localMinPrice, +localMaxPrice] : [0, 0]}
              onChangeCommitted={(_, values) => {
                const [newMinPrice, newMaxPrice] = Array.isArray(values) ? values : [0, 0];
                handleSetLocalState(newMinPrice.toString(), LocalFilters.localMinPrice);
                handleSetLocalState(newMaxPrice.toString(), LocalFilters.localMaxPrice);
              }}
              min={0}
              max={maxRangePrice}
              sx={{ padding: '11px 0 !important' }}
              marks={
                isLoadingMaxPrice
                  ? [
                      { label: <Spinner type="simple" />, value: 0 },
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
        </>
        <FormControlLabel
          checked={localSellType === 'auction'}
          onChange={() => handleSetLocalState(localSellType === 'auction' ? '' : 'auction', LocalFilters.localSellType)}
          sx={{ display: 'block', mb: 4 }}
          control={<Checkbox />}
          label="Auction"
        />
        <FormControlLabel
          checked={localOnAnySale === 'sale'}
          onChange={() => handleSetLocalState(localOnAnySale === 'sale' ? '' : 'sale', LocalFilters.localOnAnySale)}
          sx={{ display: 'block', mb: 8 }}
          control={<Checkbox />}
          label="For sale"
        />
        <Button onClick={handleApplyClick} sx={{ width: '100%' }}>
          Apply
        </Button>
      </Box>
    </Dialog>
  );
};
