import { noop } from 'lodash';

import { BurnModalProps } from './BurnModal';

export const burnModalPropsMocked: BurnModalProps = {
  onBurn: noop,
  open: true,
  onClose: noop,
};
