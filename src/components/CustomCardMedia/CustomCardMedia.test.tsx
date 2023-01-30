import { render } from '@testing-library/react';

import { CustomCardMedia, Proportions } from '.';

const mockProduct = {
  name: 'Product name',
  image: '#',
};

describe('CustomCardMedia', () => {
  it('should render CustomImage1', () => {
    const { container } = render(<CustomCardMedia width={320} />);
    expect(container).toMatchSnapshot();
  });

  it('should render CustomImage2', () => {
    const { container } = render(
      <CustomCardMedia src={mockProduct.image} proportions={Proportions.p1to1} width={320} alt={mockProduct.name} />,
    );
    expect(container).toMatchSnapshot();
  });
});
