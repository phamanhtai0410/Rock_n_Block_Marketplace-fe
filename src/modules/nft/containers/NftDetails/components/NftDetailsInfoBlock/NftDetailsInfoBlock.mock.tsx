import { noop } from 'lodash';

import { NftDetailsInfoBlockProps } from './NftDetailsInfoBlock';

export const nftDetailsInfoBlockPropsMocked: NftDetailsInfoBlockProps = {
  descriptionProps: {
    name: 'name',
    inStock: 3,
    id: 'id',
    description: 'description',
  },
  buyProps: {
    price: '123',
    currency: 'ETH',
    usdPrice: '500,300',
    onBuyClick: noop,
  },
  creatorProps: {
    type: 'creator',
    name: 'Vasya',
    avatar: 'avatar',
    id: '',
  },
  collectionProps: {
    type: 'collection',
    name: 'Vasya',
    avatar: 'avatar',
    id: '',
  },
  gameProps: {
    type: 'game',
    name: 'Vasya',
    avatar: 'avatar',
    id: '',
  },
  historyProps: {
    owners: [],
    history: [],
    onBuyClick: noop,
    userAddress: '',
  },
  isOwner: false,
  isSeller: false,
  isOtherSeller: false,
  isAucSelling: false,
  isHighestBid: false,
  bidProps: {
    avatar: '',
    name: '',
  },
  onBidClick: noop,
  onAcceptBidClick: noop,
  isLogged: false,
  openConnectModal: noop,
};
