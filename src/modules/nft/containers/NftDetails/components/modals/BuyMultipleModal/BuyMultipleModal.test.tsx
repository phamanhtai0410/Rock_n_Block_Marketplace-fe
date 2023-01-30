import { render } from '@testing-library/react';

import { BuyMultipleModal } from './BuyMultipleModal';
import { buyMultipleModalPropsMocked } from './BuyMultipleModal.mock';

describe('BuyMultipleModal', () => {
  it('should render', () => {
    const { container } = render(<BuyMultipleModal {...buyMultipleModalPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
