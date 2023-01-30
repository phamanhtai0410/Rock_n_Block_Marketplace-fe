import { ComponentMeta } from '@storybook/react';
import { Modal } from 'components/Modal';
import { modalPropsMocked } from 'components/Modal/Modal.mocked';

import { modalProps } from './ConnectWallet.mocked';
import { ConnectWalletModal } from './ConnectWalletModal';

export default {
  title: 'components/ConnectWallet',
  component: ConnectWalletModal,
} as ComponentMeta<typeof ConnectWalletModal>;

export const Default: React.FC = () => (
  <Modal {...modalPropsMocked}>
    <ConnectWalletModal {...modalProps} />
  </Modal>
);
