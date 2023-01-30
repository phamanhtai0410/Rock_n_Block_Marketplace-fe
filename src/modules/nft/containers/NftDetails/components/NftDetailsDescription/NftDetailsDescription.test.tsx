import { render } from '@testing-library/react';

import { NftDetailsDescription } from './NftDetailsDescription';
import { nftDetailsDescriptionPropsMocked } from './NftDetailsDescription.mock';

describe('NftDetailsDescription', () => {
  it('should render', () => {
    const { container } = render(<NftDetailsDescription {...nftDetailsDescriptionPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
