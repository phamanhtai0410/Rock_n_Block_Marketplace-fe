import { noop } from 'lodash';

export const putOnSaleModalPropsMocked = {
  onPutOnSale: noop,
  onRemoveFromSale: noop,
  open: true,
  onClose: noop,
  rates: [
    {
      rate: '1.00000000',
      symbol: 'USDT',
      name: 'USDT',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707',
    },
    {
      rate: '1587.82000000',
      symbol: 'ETH',
      name: 'Matic coin',
      image: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
    },
  ],
};
