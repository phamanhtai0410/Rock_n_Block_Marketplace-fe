export * from './connect';
export * from './store';
export * from './routes';
export * from './components';
export * from './url';
export * from './actions';
export * from './requests';

export type TOptionable<T> = T | undefined;

export enum WalletProviders {
  metamask = 'MetaMask',
  walletConnect = 'WalletConnect',
}
export interface INotifyModalProps {
  currData?: {
    [k: string]: string;
  };
  closeModal: () => void;
}

export type IChainType = 'mainnet' | 'testnet';

export enum Tokens {
  USDT = 'USDT',
  AGTI = 'AGTI',
}

export enum NftStandard {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export type Nullable<T> = null | T;
export type Optional<T> = undefined | T;
