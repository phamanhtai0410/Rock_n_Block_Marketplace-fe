import { render } from '@testing-library/react';

import { CreateNftContainer } from './CreateNftContainer';
import { createNftContainerPropsMocked } from './CreateNftContainer.mock';

describe('CreateNftContainer', () => {
  it('should render', () => {
    const { container } = render(<CreateNftContainer {...createNftContainerPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
