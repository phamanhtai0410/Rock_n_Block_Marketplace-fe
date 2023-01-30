import { ComponentMeta } from '@storybook/react';

import { TransactionModal } from './TransactionModal';

export default {
  title: 'components/TransactionModal',
  component: TransactionModal,
} as ComponentMeta<typeof TransactionModal>;

export const Default: React.FC = () => <TransactionModal />;
