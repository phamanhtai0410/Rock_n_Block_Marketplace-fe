import { noop } from 'lodash';

import { PreviewNftProps } from './PreviewNft';

export const previewNftPropsMocked: PreviewNftProps = {
  name: 'test',
  price: '123',
  preview: undefined,
  onClear: noop,
};
