import { render } from '@testing-library/react';

import { PromotionChip } from './PromotionChip';

describe('PromotionChip', () => {
  it('should render', () => {
    const { container } = render(<PromotionChip />);
    expect(container).toMatchSnapshot();
  });
});
