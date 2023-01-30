import { render } from '@testing-library/react';

import { NftDetailsHistory } from './NftDetailsHistory';
import { nftDetailsHistoryPropsMocked } from './NftDetailsHistory.mock';

describe('NftDetailsHistory', () => {
  it('should render', () => {
    const { container } = render(<NftDetailsHistory {...nftDetailsHistoryPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
