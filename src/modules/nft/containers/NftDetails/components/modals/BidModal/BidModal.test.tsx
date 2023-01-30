import { render } from '@testing-library/react';

import { BidModal } from './BidModal';
import { bidModalPropsMocked } from './BidModal.mock';

describe('BidModal', () => {
  it('should render', () => {
    const { container } = render(<BidModal {...bidModalPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
