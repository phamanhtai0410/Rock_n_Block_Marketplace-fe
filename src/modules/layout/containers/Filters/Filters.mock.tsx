import { noop } from 'lodash';

import { FiltersProps } from './Filters';

export const filtersPropsMocked: FiltersProps = {
  filters: {
    activeCollection: '',
    game: '',
    onAnySale: '',
    activeCategory: '',
    minPrice: '',
    maxPrice: '',
    handleChangeFilter: noop,
    clearAllFilters: noop,
    nftStandard: 'ERC1155',
    sellType: 'auction',
    orderBy: '-created_at',
    presearch: '',
    activeCurrency: 'USDT',
    activeNetwork: '',
  },

  categories: [],
  collections: [],
  currencies: [],
};
