import { render } from '@testing-library/react';

import { NftDetailsBid } from './NftDetailsBid';
import { nftDetailsBidPropsMocked } from './NftDetailsBid.mock';

describe('NftDetailsBid', () => {
  it('should render', () => {
    const { container } = render(<NftDetailsBid {...nftDetailsBidPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
