import { render } from '@testing-library/react';

import { HistoryCard } from './HistoryCard';
import { historyCardPropsMocked } from './HistoryCard.mock';

describe('HistoryCard', () => {
  it('should render', () => {
    const { container } = render(<HistoryCard {...historyCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
