import { render } from '@testing-library/react';

import { NftCard } from './NftCard';
import { nftCardPropsMocked } from './NftCard.mock';

describe('NftCard', () => {
  it('should render', () => {
    const { container } = render(<NftCard {...nftCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
