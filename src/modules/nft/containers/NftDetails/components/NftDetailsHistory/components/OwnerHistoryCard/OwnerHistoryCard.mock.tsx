import { noop } from 'lodash';

import { OwnerHistoryCardProps } from './OwnerHistoryCard';

export const ownerHistoryCardPropsMocked: OwnerHistoryCardProps = {
  name: 'Vasya Pupkin',
  avatar: '',
  price: '54.3',
  currency: {},
  url: 'id',
  sellingQuantity: '',
  quantity: '',
  onBuyClick: noop,
  address: '',
  userAddress: '',
};
