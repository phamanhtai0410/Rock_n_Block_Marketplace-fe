import { noop } from 'lodash';

import { OpenContolMenuButtonProps } from './OpenContolMenuButton';

export const openContolMenuButtonPropsMocked: OpenContolMenuButtonProps = {
  isSeller: false,
  currency: '',
  price: '',
  usdPrice: '',
  onUpdatePrice: noop,
  onListForSale: noop,
  onBurn: noop,
  isMultiple: false,
  onTransfer: noop,
  rates: [],
  onRemoveFromSale: noop,
  isHighestBid: false,
  onPromoteClick: noop,
};
