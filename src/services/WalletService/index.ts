import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import { connectWallet as connectWalletConfig } from 'services/WalletService/config';
import { Chains, WalletProviders } from 'types';
import { getWeb3 } from 'utils';
import Web3 from 'web3';

export class WalletService {
  public connectWallet: ConnectWallet;

  constructor(initProvider?: string) {
    this.connectWallet = new ConnectWallet(initProvider);
  }

  public async initWalletConnect(providerName: WalletProviders, chainName: Chains): Promise<boolean> {
    return new Promise((resolve) => {
      const { provider, network, settings } = connectWalletConfig(chainName);
      const connecting = this.connectWallet
        .connect(provider[providerName], network, settings)
        .then((connected: boolean | any) => {
          // this.currentChain = chainName;
          return connected;
        })
        // eslint-disable-next-line no-console
        .catch((err: any) => console.log(err));

      Promise.all([connecting]).then((connect: any) => {
        resolve(connect[0]);
      });
    });
  }

  public resetConnect(): void {
    this.connectWallet.resetConect();
  }

  public eventSubscribe(): any {
    return this.connectWallet.eventSubscriber();
  }

  public Web3(rpcUrl: string): Web3 {
    if (!this.connectWallet.currentWeb3()) {
      return getWeb3(rpcUrl);
    }
    return this.connectWallet.currentWeb3();
  }

  public getAccount(): Promise<IConnect | IError | { address: string }> {
    return this.connectWallet.getAccounts();
  }

  sendTransaction(transactionConfig: any, walletAddress: string, rpcUrl: string): any {
    return this.Web3(rpcUrl).eth.sendTransaction({
      ...transactionConfig,
      from: walletAddress,
    });
  }
}
