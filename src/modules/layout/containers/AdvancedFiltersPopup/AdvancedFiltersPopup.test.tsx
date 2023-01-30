import { render } from '@testing-library/react';

import { AdvancedFiltersPopup } from './AdvancedFiltersPopup';
import { advancedFiltersPopupPropsMocked } from './AdvancedFiltersPopup.mock';

describe('AdvancedFiltersPopup', () => {
  it('should render', () => {
    const { container } = render(<AdvancedFiltersPopup {...advancedFiltersPopupPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
