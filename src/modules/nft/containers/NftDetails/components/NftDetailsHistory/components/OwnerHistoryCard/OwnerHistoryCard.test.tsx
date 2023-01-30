import { render } from '@testing-library/react';

import { OwnerHistoryCard } from './OwnerHistoryCard';
import { ownerHistoryCardPropsMocked } from './OwnerHistoryCard.mock';

describe('OwnerHistoryCard', () => {
  it('should render', () => {
    const { container } = render(<OwnerHistoryCard {...ownerHistoryCardPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
