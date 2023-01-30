import { render } from '@testing-library/react';

import { NftDetailsControlBlock } from './NftDetailsControlBlock';
import { nftDetailsControlBlockPropsMocked } from './NftDetailsControlBlock.mock';

describe('NftDetailsControlBlock', () => {
  it('should render', () => {
    const { container } = render(<NftDetailsControlBlock {...nftDetailsControlBlockPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
