import { render } from '@testing-library/react';

import { PropertyHistoryCard } from './PropertyHistoryCard';
import { propertyHistoryCardPropsMocked } from './PropertyHistoryCard.mock';

describe('PropertyHistoryCard', () => {
  it('should render', () => {
    const { container } = render(<PropertyHistoryCard {...propertyHistoryCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
