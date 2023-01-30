import { render } from '@testing-library/react';
import { customImagePropsMocked } from 'components/CustomImage/CustomImage.mock';

import { CustomImage } from './CustomImage';

describe('CustomImage', () => {
  it('should render', () => {
    const { container } = render(<CustomImage {...customImagePropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
