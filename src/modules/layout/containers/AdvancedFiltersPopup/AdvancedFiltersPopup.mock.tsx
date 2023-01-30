import { noop } from 'lodash';
import { Filter } from 'modules/layout/containers/Filters';

import { AdvancedFiltersPopupProps } from './AdvancedFiltersPopup';

export const advancedFiltersPopupPropsMocked: AdvancedFiltersPopupProps = {
  open: false,
  onClose: noop,
  collections: [],
  currencies: [],
  displayedFilters: {
    [Filter.Standard]: true,
  },
  filters: {
    activeCollection: '',
    onAnySale: '',
    game: '',
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
  gameOptions: [],
  onGameLoadMore: undefined,
  gameOption: null,
  handleGameValueChange: undefined,
};
