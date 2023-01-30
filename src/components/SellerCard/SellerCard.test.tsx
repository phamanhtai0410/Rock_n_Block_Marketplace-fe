import { render } from '@testing-library/react';

import { SellerCard } from './SellerCard';
import { SellerCardPropsMocked } from './SellerCard.mock';

describe('SellerCard', () => {
  it('should render', () => {
    const { container } = render(<SellerCard {...SellerCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
