import { render } from '@testing-library/react';

import { Card } from './Card';
import { cardPropsMocked } from './Card.mock';

describe('Card', () => {
  it('should render', () => {
    const { container } = render(<Card {...cardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
