import { noop } from 'lodash';

import { AcceptBidModalProps } from './AcceptBidModal';

export const acceptBidModalPropsMocked: AcceptBidModalProps = {
  onAcceptBid: noop,
  open: true,
  onClose: noop,
  highestBid: '1.46',
  highestBidUsd: '2246.5',
  currency: 'ETH',
  bidder: {
    name: '',
    avatar: undefined,
  },
};
