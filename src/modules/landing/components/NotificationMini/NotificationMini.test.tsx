import { render } from '@testing-library/react';

import { NotificationMini } from './NotificationMini';
import { notificationMiniPropsMockedLike } from './NotificationMini.mock';

describe('NotificationMini', () => {
  it('should render', () => {
    const { container } = render(<NotificationMini {...notificationMiniPropsMockedLike} />);
    expect(container).toMatchSnapshot();
  });
});
