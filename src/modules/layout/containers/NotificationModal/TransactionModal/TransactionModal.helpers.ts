import { FC } from 'react';
import { Icon } from 'components/Icon';
import { Spinner } from 'components/Spinner';
import { Modals } from 'types/store/modals';

enum RepeatTransactionType {
  send,
  approve,
}

export type ModalData = {
  [key in Modals]: {
    title: string;
    subtitle?: string;
    Icon?: string | FC;
    body1?: string;
    body2?: string;
    isCopiable?: boolean;
    repeatTransactions?: keyof typeof RepeatTransactionType;
  };
};

export const modalData: Partial<ModalData> = {
  [Modals.init]: {
    title: '',
  },

  // Transaction steps modals
  [Modals.ApprovePending]: {
    title: 'Step 1/2 approve',
    Icon: Spinner,
    body1: 'Please press "Approve" button in metamask extension',
    body2:
      'ERC-20 tokens are deployed with functionality that allows other smart contracts to move tokens. By approving the smart contracts, it now has permission to execute the peer to peer swapping behavior on your behalf. The Spend Limit permission is the total amount of tokens that are able to move when using MetaMask Swap.',
  },
  [Modals.ApproveRejected]: {
    title: 'Step 1/2 approve',
    Icon: Icon.Warning,
    body1: 'You rejected Approve transaction in Metamask. Press Approve again to start over or close this window.',
    body2:
      'ERC-20 tokens are deployed with functionality that allows other smart contracts to move tokens. By approving the smart contracts, it now has permission to execute the peer to peer swapping behavior on your behalf. The Spend Limit permission is the total amount of tokens that are able to move when using MetaMask Swap.',
  },
  [Modals.SendPending]: {
    title: 'Step 2/2 send',
    Icon: Spinner,
    body1: 'Please press "Send" button in Metamask extension',
    body2: 'You tokens will be transferred from your wallet to the contract address',
  },
  [Modals.SendSuccess]: {
    title: 'Step 2/2 Send',
    subtitle: 'Sent! 🎉',
    body1: 'Your transaction has been approved on the blockchain',
    isCopiable: true,
  },
  [Modals.SendRejected]: {
    title: 'Step 2/2 send',
    Icon: Icon.Warning,
    body1: 'You rejected Send transaction in Metamask. Press Send again to start over or close this window.',
    repeatTransactions: 'send',
  },
  [Modals.MintSuccess]: {
    title: 'Step 2/2 send',
    subtitle: 'NFT minted! 🎉',
    body1: 'Your NFT will appear in 2 minutes in your Profile',
    isCopiable: true,
  },
};
