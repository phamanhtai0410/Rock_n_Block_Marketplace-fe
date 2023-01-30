import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICurrency } from 'modules/layout/containers/Filters/Filters.types';
import { Chains } from 'types';

import {
  convertFiltersToSearchParams,
  DEFAULT_VALUE_FOR_ALL_OPTION,
  nftStandardOptions,
  orderByOptions,
} from './useFilters.helpers';

export type SellType = 'auction' | 'fix' | '';
export type onAnySale = 'sale' | '';
export type OrderBy = '-price' | 'price' | 'created_at' | '-created_at' | 'likes' | '-likes' | '';

interface IUseFiltersConfig {
  currencies?: Array<ICurrency>;
  defaultMinPrice?: string;
  defaultMaxPrice?: string;
  defaultNetwork?: Chains | '';
}

export const useFilters = (config?: IUseFiltersConfig) => {
  const { currencies, defaultMaxPrice, defaultMinPrice, defaultNetwork = '' } = config || {};
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), [location.search]);
  const [orderBy, setOrderBy] = useState<OrderBy>((urlParams.get('orderBy') || orderByOptions[0].value) as OrderBy);
  const [nftStandard, setNftStandard] = useState(urlParams.get('nftStandard') || nftStandardOptions[0].value);
  const [sellType, setSellType] = useState<SellType>(urlParams.get('sellType') as SellType);
  const [onAnySale, setOnAnySale] = useState<onAnySale>(urlParams.get('onAnySale') as onAnySale);
  const [minPrice, setMinPrice] = useState(urlParams.get('minPrice') || defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlParams.get('maxPrice') || defaultMaxPrice);
  const [activeCollection, setActiveCollection] = useState(
    urlParams.get('activeCollection') || DEFAULT_VALUE_FOR_ALL_OPTION,
  );
  const [activeCategory, setActiveCategory] = useState(urlParams.get('activeCategory') || DEFAULT_VALUE_FOR_ALL_OPTION);
  const [activeCurrency, setActiveCurrency] = useState(urlParams.get('activeCurrency') || DEFAULT_VALUE_FOR_ALL_OPTION);
  const [game, setGame] = useState(urlParams.get('game') || DEFAULT_VALUE_FOR_ALL_OPTION);
  const [activeNetwork, setActiveNetwork] = useState(urlParams.get('activeNetwork') || defaultNetwork);
  const [presearch, setPresearch] = useState(urlParams.get('presearch'));

  useEffect(() => {
    if (defaultNetwork) {
      setActiveNetwork(defaultNetwork);
    }
  }, [defaultNetwork]);

  useEffect(() => {
    if (urlParams.get('presearch')) {
      setPresearch(urlParams.get('presearch'));
    }
  }, [location.search, urlParams]);

  const clearAllFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setNftStandard('');
    setActiveCollection('');
    setSellType('');
    setOrderBy('');
    setPresearch('');
    setActiveCategory('');
    setActiveCurrency(currencies?.[0]?.value || '');
    setOnAnySale('');
    setActiveNetwork('');
    navigate(window.location.pathname);
  };

  const filterNamesToTheirHandlers = {
    activeCollection: { value: activeCollection, handler: setActiveCollection },
    nftStandard: { value: nftStandard, handler: setNftStandard },
    sellType: { value: sellType, handler: setSellType },
    maxPrice: { value: maxPrice, handler: setMaxPrice },
    minPrice: { value: minPrice, handler: setMinPrice },
    orderBy: { value: orderBy, handler: setOrderBy },
    activeCategory: { value: activeCategory, handler: setActiveCategory },
    activeCurrency: { value: activeCurrency, handler: setActiveCurrency },
    onAnySale: { value: onAnySale, handler: setOnAnySale },
    presearch: { value: presearch, handler: setPresearch },
    activeNetwork: { value: activeNetwork, handler: setActiveNetwork },
    game: { value: game, handler: setGame },
  };

  type FilterNames = typeof filterNamesToTheirHandlers;

  const handleChangeFilter = <T extends keyof FilterNames, S extends FilterNames[T]>(
    filterName: T,
    filterValue: S['value'],
  ) => {
    // TODO: fix this comments when connect to backend
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore stupid-react-types
    filterNamesToTheirHandlers[filterName].handler(filterValue);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore stupid-react-types
    navigate(convertFiltersToSearchParams(filterName, filterValue), { replace: true });
  };

  return {
    activeCollection,
    activeCategory,
    activeCurrency,
    maxPrice,
    minPrice,
    nftStandard,
    sellType,
    orderBy,
    presearch,
    game,
    onAnySale,
    activeNetwork,
    clearAllFilters,
    handleChangeFilter,
  };
};

export type IFilters = ReturnType<typeof useFilters>;
