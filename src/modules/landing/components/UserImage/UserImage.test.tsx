import { render } from '@testing-library/react';

import { UserImage } from './UserImage';
import { userImagePropsMocked } from './UserImage.mock';

describe('UserImage', () => {
  it('should render', () => {
    const { container } = render(<UserImage {...userImagePropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
