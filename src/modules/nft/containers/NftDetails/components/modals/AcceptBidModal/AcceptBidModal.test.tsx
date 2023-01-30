import { render } from '@testing-library/react';

import { AcceptBidModal } from './AcceptBidModal';
import { acceptBidModalPropsMocked } from './AcceptBidModal.mock';

describe('BidModal', () => {
  it('should render', () => {
    const { container } = render(<AcceptBidModal {...acceptBidModalPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
