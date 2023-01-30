import { noop } from 'lodash';

import { UpdatePriceModalProps } from './UpdatePriceModal';

export const updatePriceModalPropsMocked: UpdatePriceModalProps = {
  onUpdatePrice: noop,
  open: true,
  onClose: noop,
  price: '1.46',
  currency: 'ETH',
  rates: [],
};
