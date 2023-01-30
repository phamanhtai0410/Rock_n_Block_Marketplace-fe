import { render } from '@testing-library/react';

import { WhatsNft } from './WhatsNft';

describe('WhatsNft', () => {
  it('should render', () => {
    const { container } = render(<WhatsNft />);
    expect(container).toMatchSnapshot();
  });
});
