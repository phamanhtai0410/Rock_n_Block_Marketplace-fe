import { render } from '@testing-library/react';

import { NftDetailsBuy } from './NftDetailsBuy';
import { nftDetailsBuyPropsMocked } from './NftDetailsBuy.mock';

describe('NftDetailsBuy', () => {
  it('should render', () => {
    const { container } = render(<NftDetailsBuy {...nftDetailsBuyPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
