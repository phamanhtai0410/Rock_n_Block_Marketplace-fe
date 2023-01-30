import { render } from '@testing-library/react';

import { BurnModal } from './BurnModal';
import { burnModalPropsMocked } from './BurnModal.mock';

describe('BurnModal', () => {
  it('should render', () => {
    const { container } = render(<BurnModal {...burnModalPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
