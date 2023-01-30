import { noop } from 'lodash';

import { PropertyRowCardProps } from './PropertyRowCard';

export const propetyRowCardPropsMocked: PropertyRowCardProps = {
  name: 'Diamond Teeth',
  amount: 4,
  onPerkChangeClick: () => noop,
  isActive: false,
};
