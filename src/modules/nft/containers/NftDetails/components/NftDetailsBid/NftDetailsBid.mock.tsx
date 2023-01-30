import { noop } from 'lodash';

import { NftDetailsBidProps } from './NftDetailsBid';

export const nftDetailsBidPropsMocked: NftDetailsBidProps = {
  endAuction: '1661510268',
  onBidClick: noop,
  onAcceptBidClick: noop,
  isHighestBid: false,
  currentHighestBid: {
    amount: '',
    currency: '',
    address: '',
    usdAmount: undefined,
    avatar: undefined,
    name: undefined,
  },
  isOwner: false,
  isLogged: false,
  openConnectModal: noop,
};
