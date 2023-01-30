import { render } from '@testing-library/react';

import { NftDetailsCreatorCollection } from './NftDetailsCreatorCollection';
import { nftDetailsCreatorCollectionPropsMocked } from './NftDetailsCreatorCollection.mock';

describe('NftDetailsCreatorCollection', () => {
  it('should render', () => {
    const { container } = render(<NftDetailsCreatorCollection {...nftDetailsCreatorCollectionPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
