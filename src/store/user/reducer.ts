import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chains, Themes, UserState, WalletProviders } from 'types';

const initialState: UserState = {
  address: '',
  provider: WalletProviders.metamask,
  chainType: 'mainnet',
  network: Chains.eth,
  rankId: '',
  key: '',
  theme: Themes.dark,
  user: {
    address: '',
    avatar: '',
    bio: '',
    cover: '',
    createdAt: '',
    customUrl: '',
    displayName: '',
    email: '',
    facebook: '',
    followers: [],
    followersCount: 0,
    follows: [],
    followsCount: 0,
    id: 0,
    instagram: '',
    isFollowing: false,
    isVerificated: false,
    name: '',
    site: '',
    twitter: '',
    url: '',
  },

  tokenData: [],
  tokens: [],
  topUsers: [],
  followers: null,
  following: null,
  serviceFee: '0',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState: (state: UserState, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    disconnectWalletState: (state: UserState) => {
      localStorage.removeItem('walletconnect');
      return {
        ...initialState,
        topUsers: state.topUsers,
        theme: state.theme,
      };
    },
    toggleTheme: (state: UserState) => ({
      ...state,
      theme: state.theme === Themes.dark ? Themes.light : Themes.dark,
    }),
    updateUserProfileState: (state: UserState, action: PayloadAction<Partial<UserState['user']>>) => ({
      ...state,
      user: {
        ...state.user,
        ...action.payload,
      },
    }),
  },
});

export const { disconnectWalletState, updateUserState, toggleTheme, updateUserProfileState } = userReducer.actions;

export default userReducer.reducer;
