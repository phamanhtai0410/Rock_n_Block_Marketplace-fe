import { noop } from 'lodash';

import { BuyMultipleModalProps } from './BuyMultipleModal';

export const buyMultipleModalPropsMocked: BuyMultipleModalProps = {
  onBuyMultiple: noop,
  open: false,
  onClose: noop,
  sellers: [],
  userAddress: '',
};
