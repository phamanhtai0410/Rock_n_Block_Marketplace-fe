import { render } from '@testing-library/react';

import { OpenContolMenuButton } from './OpenContolMenuButton';
import { openContolMenuButtonPropsMocked } from './OpenContolMenuButton.mock';

describe('OpenContolMenuButton', () => {
  it('should render', () => {
    const { container } = render(<OpenContolMenuButton {...openContolMenuButtonPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
