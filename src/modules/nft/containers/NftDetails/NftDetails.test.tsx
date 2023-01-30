import { render } from '@testing-library/react';

import { NftDetails } from './NftDetails';

describe('NftDetails', () => {
  it('should render', () => {
    const { container } = render(<NftDetails />);
    expect(container).toMatchSnapshot();
  });
});
