import { noop } from 'lodash';

import { BidModalProps } from './BidModal';

export const bidModalPropsMocked: BidModalProps = {
  userBalance: 0,
  onBid: noop,
  open: true,
  onClose: noop,
  isHighestbid: false,
  currentHighestBid: {
    amount: '',
    currency: '',
    address: '',
    usdAmount: 0,
  },
};
