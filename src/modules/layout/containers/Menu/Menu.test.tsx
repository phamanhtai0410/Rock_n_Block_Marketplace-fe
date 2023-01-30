import { render } from '@testing-library/react';

import { Menu } from './Menu';
import { menuPropsMocked } from './Menu.mock';

describe('Menu', () => {
  it('should render', () => {
    const { container } = render(<Menu {...menuPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
