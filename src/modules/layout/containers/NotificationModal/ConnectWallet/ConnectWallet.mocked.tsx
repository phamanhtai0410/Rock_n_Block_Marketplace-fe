import { noop } from 'lodash';

import { ConnectWalletModalProps } from './ConnectWalletModal';

export const modalProps: ConnectWalletModalProps = {
  onConnectWallet: noop,
  onClose: noop,
  open: true,
};
