import { render } from '@testing-library/react';

import { Banner } from './Banner';

describe('Banner', () => {
  it('should render', () => {
    const { container } = render(<Banner />);
    expect(container).toMatchSnapshot();
  });
});
