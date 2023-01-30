import { noop } from 'lodash';

import { NftDetailsControlBlockProps } from './NftDetailsControlBlock';

export const nftDetailsControlBlockPropsMocked: NftDetailsControlBlockProps = {
  onLikeClick: noop,
  isLiked: false,
  likeCount: 0,
  isOwner: false,
  isSeller: true,
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
