import { noop } from 'lodash';

import { NftDetailsBuyProps } from './NftDetailsBuy';

export const nftDetailsBuyPropsMocked: NftDetailsBuyProps = {
  price: '2.5',
  currency: 'ETH',
  usdPrice: '2,764.89',
  onBuyClick: noop,
};
