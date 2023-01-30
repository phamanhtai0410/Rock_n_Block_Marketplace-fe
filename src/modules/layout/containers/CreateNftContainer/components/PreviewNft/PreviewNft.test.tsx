import { render } from '@testing-library/react';

import { PreviewNft } from './PreviewNft';
import { previewNftPropsMocked } from './PreviewNft.mock';

describe('PreviewNft', () => {
  it('should render', () => {
    const { container } = render(<PreviewNft {...previewNftPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
