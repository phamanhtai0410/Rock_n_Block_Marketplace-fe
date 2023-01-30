import { render } from '@testing-library/react';

import { CollectionContainer } from './CollectionContainer';
import { CollectionContainerPropsMocked } from './CollectionContainer.mock';

describe('CreateCollectionContainer', () => {
  it('should render', () => {
    const { container } = render(<CollectionContainer isForEdit={false} {...CollectionContainerPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
