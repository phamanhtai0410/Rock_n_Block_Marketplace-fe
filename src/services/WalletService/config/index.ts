import { isProduction } from 'appConstants';
import { bscLogo, ethereumLogo, polygonLogo } from 'assets/images';
import { Chains, IConnectWallet, IContracts, WalletProviders } from 'types';
import { AbiItem } from 'web3-utils';

import { collection1155Abi, erc20Abi, exchangeAbi, promotionAbi } from './abi';

export const isMainnet = false;
export const RPC_INFURA_TESTNET = 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
export const RPC_INFURA_MAINNET = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

export const BSC_RPC_TESTNET = 'https://data-seed-prebsc-1-s3.binance.org:8545/';
export const BSC_RPC_MAINNET = 'https://bsc-dataseed.binance.org/';

export const POLYGON_RPC_TESTNET = 'https://polygon-mumbai.g.alchemy.com/v2/2JWCMIDcdqNJNN2woBa73Tha2AfY9pjy';
export const POLYGON_RPC_MAINNET = 'https://polygon-rpc.com/';

export enum ChainNetwork {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export enum ChainId {
  Ethereum = 1,
  EthereumTestnet = 5,
  Bsc = 56,
  BscTestnet = 97,
  Mumbai = 80001,
  Polygon = 137,
}

export const chains: {
  [chain in Chains]: {
    [network in ChainNetwork]: {
      id: Chains;
      name: string;
      nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
      };
      rpc: string;
      blockExplorerUrl: string;
      chainId: number;
      provider: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      };

      img?: string;
    };
  };
} = {
  [Chains.eth]: {
    mainnet: {
      id: Chains.eth,
      name: 'Ethereum',
      chainId: ChainId.Ethereum,
      img: ethereumLogo,
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpc: RPC_INFURA_MAINNET,
      blockExplorerUrl: 'https://etherscan.io/',
      provider: {
        MetaMask: { name: WalletProviders.metamask },
        WalletConnect: {
          name: WalletProviders.walletConnect,
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                [ChainId.Ethereum]: RPC_INFURA_MAINNET,
              },
              chainId: ChainId.Ethereum,
            },
          },
        },
      },
    },
    testnet: {
      id: Chains.eth,
      name: 'Goerli',
      chainId: ChainId.EthereumTestnet,
      img: ethereumLogo,
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpc: RPC_INFURA_TESTNET,
      blockExplorerUrl: 'https://goerli.etherscan.io/',
      provider: {
        MetaMask: { name: WalletProviders.metamask },
        WalletConnect: {
          name: WalletProviders.walletConnect,
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                [ChainId.EthereumTestnet]: RPC_INFURA_TESTNET,
              },
              chainId: ChainId.EthereumTestnet,
            },
          },
        },
      },
    },
  },
  [Chains.bsc]: {
    mainnet: {
      id: Chains.bsc,
      name: 'BSC Mainnet',
      chainId: ChainId.Bsc,
      img: bscLogo,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpc: BSC_RPC_MAINNET,
      blockExplorerUrl: 'https://bscscan.com/',
      provider: {
        MetaMask: { name: WalletProviders.metamask },
        WalletConnect: {
          name: WalletProviders.walletConnect,
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                [ChainId.Bsc]: BSC_RPC_MAINNET,
              },
              chainId: ChainId.Bsc,
            },
          },
        },
      },
    },
    testnet: {
      id: Chains.bsc,
      name: 'BSC Testnet',
      chainId: ChainId.BscTestnet,
      img: bscLogo,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpc: BSC_RPC_TESTNET,
      blockExplorerUrl: 'https://testnet.bscscan.com/',
      provider: {
        MetaMask: { name: WalletProviders.metamask },
        WalletConnect: {
          name: WalletProviders.walletConnect,
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                [ChainId.BscTestnet]: BSC_RPC_TESTNET,
              },
              chainId: ChainId.BscTestnet,
            },
          },
        },
      },
    },
  },
  [Chains.pol]: {
    mainnet: {
      id: Chains.pol,
      name: 'Polygon Mainnet',
      chainId: ChainId.Polygon,
      img: polygonLogo,
      nativeCurrency: {
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpc: POLYGON_RPC_MAINNET,
      blockExplorerUrl: 'https://polygonscan.com/',
      provider: {
        MetaMask: { name: WalletProviders.metamask },
        WalletConnect: {
          name: WalletProviders.walletConnect,
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                [ChainId.Polygon]: POLYGON_RPC_MAINNET,
              },
              chainId: ChainId.Polygon,
            },
          },
        },
      },
    },
    testnet: {
      id: Chains.pol,
      name: 'Mumbai',
      chainId: ChainId.Mumbai,
      img: polygonLogo,
      nativeCurrency: {
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpc: POLYGON_RPC_TESTNET,
      blockExplorerUrl: 'https://mumbai.polygonscan.com/',
      provider: {
        MetaMask: { name: WalletProviders.metamask },
        WalletConnect: {
          name: WalletProviders.walletConnect,
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                [ChainId.Mumbai]: POLYGON_RPC_TESTNET,
              },
              chainId: ChainId.Mumbai,
            },
          },
        },
      },
    },
  },
};

export const currentChains = Object.values(chains).map((chain) => chain[isProduction ? 'mainnet' : 'testnet']);

export const connectWallet = (newChainName: Chains): IConnectWallet => {
  const chain = chains[newChainName][isProduction ? 'mainnet' : 'testnet'];
  return {
    network: {
      chainName: chain.name,
      chainID: chain.chainId,
      nativeCurrency: chain.nativeCurrency,
      rpc: chain.rpc,
      blockExplorerUrl: chain.blockExplorerUrl,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export enum ContractsNames {
  usdt,
  exchange,
  promotion,
  collection1155,
  collection721,
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.usdt]: {
      testnet: {
        address: {
          [Chains.eth]: '0x6b791AE2380DEeD9d6C79f7D886cF51C509D9229',
          [Chains.bsc]: '0xD464E0192708dA594a91D5fD73C6D49c2E175279',
          [Chains.pol]: '0x4CE584816E56845979067cb7E2159dAC154f09bE',
        },
        abi: erc20Abi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.eth]: '123',
        },
        abi: erc20Abi as AbiItem[],
      },
    },
    [ContractsNames.collection1155]: {
      testnet: {
        abi: collection1155Abi as AbiItem[],
      },
      mainnet: {
        abi: collection1155Abi as AbiItem[],
      },
    },
    [ContractsNames.collection721]: {
      testnet: {
        abi: erc20Abi as AbiItem[],
      },
      mainnet: {
        abi: erc20Abi as AbiItem[],
      },
    },
    [ContractsNames.exchange]: {
      testnet: {
        address: {
          [Chains.eth]: '0x7c06238480d8F48Be94139D4977eAA58014915Db',
          [Chains.bsc]: '0xE84ce1A4F9b76A80800f409b26225b16AeDAa08D',
          [Chains.pol]: '0xC461F7B7C0C5a1732c4a97842bD0BC22aF160E53',
        },
        abi: exchangeAbi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.eth]: '0x625A5b6583ecb0AeA6323274eD52FaA1012c929d',
          [Chains.bsc]: '0x625A5b6583ecb0AeA6323274eD52FaA1012c929d',
          [Chains.pol]: '0x625A5b6583ecb0AeA6323274eD52FaA1012c929d',
        },
        abi: exchangeAbi as AbiItem[],
      },
    },
    [ContractsNames.promotion]: {
      testnet: {
        address: {
          [Chains.eth]: '0xB79a10d75463cD057FD721928A864301bD6046F8',
          [Chains.bsc]: '0xb56A9c5Cbb81FD4aC342644eac4C8651C7e597A7',
          [Chains.pol]: '0xd0fF8b5a7723752309ab2222A40b0485aA53C558',
        },
        abi: promotionAbi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.eth]: '0xBE3CE2cA155b83A84049AC870685eAd2A57521d5',
          [Chains.bsc]: '0xBE3CE2cA155b83A84049AC870685eAd2A57521d5',
          [Chains.pol]: '0xBE3CE2cA155b83A84049AC870685eAd2A57521d5',
        },
        abi: promotionAbi as AbiItem[],
      },
    },
  },
};
