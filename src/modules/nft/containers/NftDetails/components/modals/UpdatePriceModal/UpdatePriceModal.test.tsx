import { render } from '@testing-library/react';

import { UpdatePriceModal } from './UpdatePriceModal';
import { updatePriceModalPropsMocked } from './UpdatePriceModal.mock';

describe('UpdatePriceModal', () => {
  it('should render', () => {
    const { container } = render(<UpdatePriceModal {...updatePriceModalPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
