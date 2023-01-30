import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IConnect, IError, IEventError } from '@amfi/connect-wallet/dist/interface';
import { isProduction } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { Subscription } from 'rxjs';
import { chains, contractsConfig, ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { getRates, login } from 'store/user/actions';
import { disconnectWalletState, updateUserState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';
import { Chains, State, UserState, WalletProviders } from 'types';
import { getToastMessage } from 'utils';

import { WalletService } from '../WalletService';

const closeWalletConnectModalErrorText = "Cannot read properties of undefined (reading 'connector')";

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains, shouldLogin?: boolean, shouldUpdate?: boolean) => Promise<void>;
  disconnect: () => void;
  addTokenToWallet: () => void;
  walletService: WalletService;
}

interface WalletConnectProps {
  children: ReactNode;
}

type IAccountInfo = IConnect | IError | { address: string };

const Web3Context = createContext({} as IContextValue);

const WalletConnectContext: FC<WalletConnectProps> = ({ children }) => {
  const [currentSubsriber, setCurrentSubsciber] = useState<Subscription>();
  const WalletConnect = useMemo(() => new WalletService(), []);
  const dispatch = useDispatch();
  const {
    address,
    provider: WalletProvider,
    chainType,
    network,
    key,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.resetConnect();
    currentSubsriber?.unsubscribe();
    getToastMessage('info', notifyText.disconnet.info);
  }, [WalletConnect, currentSubsriber, dispatch]);

  const subscriberSuccess = useCallback(
    (res: { name: string; address: string }) => {
      if (document.visibilityState !== 'visible') {
        disconnect();
      }
      if (res.name === 'accountsChanged') {
        disconnect();
        getToastMessage('info', 'Please sign login message at MetaMask');
      }
    },
    [disconnect],
  );

  const subscriberError = useCallback(
    (error: IEventError) => {
      console.error('connect error', error);
      // @ts-expect-error wrong type annotations
      if (error.message?.message === 'Chain not selected or not equal to settings chain') {
        return;
      }

      WalletConnect.resetConnect();
      getToastMessage('error', 'You changed to wrong network. Please choose Ethereum Mainnet');
      dispatch(disconnectWalletState());
    },
    [WalletConnect, dispatch],
  );

  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains, shouldLogin = true, shouldUpdate = false) => {
      const rpcUrl = chains[chain][isProduction ? 'mainnet' : 'testnet'].rpc;
      try {
        const connected = await WalletConnect.initWalletConnect(provider, chain);
        if (connected) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const sub: any = WalletConnect.eventSubscribe().subscribe(subscriberSuccess, subscriberError);
          const accountInfo: IAccountInfo = await WalletConnect.getAccount();
          const accountAddress = (accountInfo as IConnect).address;

          // Update connect wallet info
          if (shouldUpdate) {
            dispatch(
              updateUserState({
                // address: accountAddress,
                // provider: (accountInfo as IError).type as WalletProviders,
                network: chain,
              }),
            );
          }

          // Sign message for backend auth
          if (accountAddress && shouldLogin) {
            dispatch(
              login({
                address: accountAddress,
                web3Provider: WalletConnect.Web3(rpcUrl),
                provider: (accountInfo as IError).type,
                network: chain,
              }),
            );
          }

          setCurrentSubsciber(sub);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error, 'CONNECT ERROR');
        if (error.message === closeWalletConnectModalErrorText) {
          throw error;
        }
        getToastMessage('error', `Please set network ${chain}`);
        throw error;
        // if (error.code === 4) {
        //   window.open(
        //     `https://metamask.app.link/dapp/${window.location.hostname + window.location.pathname}/?utm_source=mm`,
        //   );
        // }
      }
    },
    [WalletConnect, dispatch, subscriberError, subscriberSuccess],
  );

  const addTokenToWallet = useCallback(async () => {
    try {
      if (window.ethereum) {
        const tokenAddress =
          contractsConfig.contracts[ContractsNames.usdt][isProduction ? 'mainnet' : 'testnet']?.address?.[Chains.eth] ||
          '';
        const {
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          img: tokenImage,
        } = contractsConfig.contracts[ContractsNames.usdt][isProduction ? 'mainnet' : 'testnet'];

        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          getToastMessage('success', `${tokenSymbol?.toUpperCase()} added to your wallet`);
        } else {
          getToastMessage('error', 'Something went wrong, check your metamask wallet');
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // connect user if he connected previously
    if (WalletProvider && address.length && network) {
      connect(WalletProviders.metamask, network, false);
      // TODO: dont touch for now,  will fix later
      // https://manzoni.atlassian.net/jira/software/projects/KAT/boards/200?selectedIssue=KAT-136
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Web3Context.Provider value={{ connect, disconnect, addTokenToWallet, walletService: WalletConnect }}>
      {children}
    </Web3Context.Provider>
  );
};

const useWalletConnectorContext = () => useContext(Web3Context);

export { WalletConnectContext, useWalletConnectorContext };
