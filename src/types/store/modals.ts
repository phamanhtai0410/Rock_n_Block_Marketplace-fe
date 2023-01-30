// eslint-disable-next-line no-shadow
export enum Modals {
  init = '',
  ApprovePending = 'ApprovePending',
  ApproveRejected = 'ApproveRejected',
  SendPending = 'SendPending',
  SendRejected = 'SendRejected',
  SendSuccess = 'SendSuccess',
  MintSuccess = 'MintSuccess',
}

export interface ModalState {
  activeModal: Modals;
  txHash: string;
  open: boolean;
  repeatCallback?: () => void;
}

export type ModalsInitialState = {
  modalState: ModalState;
};
