import { render } from '@testing-library/react';

import { SellersTokens } from './SellersTokens';

const setup = () =>
  render(
    <SellersTokens
      sellers={Array(10).fill(null)}
      featured={Array(10).fill(null)}
      trending={Array(10).fill(null)}
      categories={null}
      category="0"
      onCategoryChange={() => null}
    />,
  );

describe.skip('Carousel', () => {
  it('should render', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
