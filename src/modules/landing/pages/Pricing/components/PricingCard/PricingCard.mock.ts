import { noop } from 'lodash';

import { PricingCardProps } from './PricingCard';

export const mockProps: PricingCardProps = {
  price: '',
  days: 0,
  onPromotionSelect: noop,
  onPromotionBuy: noop,
  selectedPromotionData: {
    currency: '123',
    usdPrice: '123',
  },
  rates: [],
};
