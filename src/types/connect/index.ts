import { INetwork, IProvider, ISettings } from '@amfi/connect-wallet/src/interface';
import { ContractsNames } from 'services/WalletService/config';
import { AbiItem } from 'web3-utils';

// *some of it will change later
export enum Chains {
  eth = 'Ethereum',
  bsc = 'Binance-Smart-Chain',
  pol = 'Polygon',
}
// *insert chans when the wallet will configuring*

export interface IConnectWallet {
  network: INetwork;
  provider: {
    [index: string]: IProvider;
  };
  settings: ISettings;
}

export interface IChainConfig {
  name: string;
  id: number;
  rpc: string;
  tx: {
    link: string;
  };
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExp: string;
}

export interface IContracts {
  decimals: number;
  names: string[];
  contracts: {
    [key in ContractsNames]: {
      testnet: {
        address?: {
          // @ts-expect-error optional key in
          [chainKey: Chains]: string;
        };
        abi: AbiItem[];
        symbol?: string;
        img?: string;
        decimals?: number;
      };
      mainnet: {
        address?: {
          // @ts-expect-error optional key in
          [chainKey: Chains]: string;
        };
        abi: AbiItem[];
        symbol?: string;
        img?: string;
        decimals?: number;
      };
    };
  };
}
