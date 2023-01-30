import { render } from '@testing-library/react';

import { ShareButton } from './ShareButton';
import { shareButtonPropsMocked } from './ShareButton.mock';

describe('ShareButton', () => {
  it('should render', () => {
    const { container } = render(<ShareButton {...shareButtonPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
