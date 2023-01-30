import { render } from '@testing-library/react';

import { NftDetailsInfoBlock } from './NftDetailsInfoBlock';
import { nftDetailsInfoBlockPropsMocked } from './NftDetailsInfoBlock.mock';

describe('NftDetailsInfoBlock', () => {
  it('should render', () => {
    const { container } = render(<NftDetailsInfoBlock {...nftDetailsInfoBlockPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
