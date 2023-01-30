import { isProduction } from 'appConstants';
import { chains } from 'services/WalletService/config';
import type { State, UserState } from 'types';

const userSelector = {
  getUser: (state: State) => ({
    ...state.user,
    chain: chains[state.user.network][isProduction ? 'mainnet' : 'testnet'],
  }),
  getProp:
    <T extends keyof UserState>(propKey: T) =>
    (state: State): UserState[typeof propKey] =>
      state.user[propKey],
};

export default userSelector;
