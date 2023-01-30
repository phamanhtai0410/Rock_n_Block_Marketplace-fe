import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileTab } from 'types/store';
import { ProfileState } from 'types/store/profile';

const initialProfileData = {
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
};

const initialState: ProfileState = {
  profile: initialProfileData,
  collections: [],

  profileTabData: {
    [ProfileTab.Owned]: null,
    [ProfileTab.ForSale]: null,
    [ProfileTab.Bided]: null,
    [ProfileTab.Favorites]: null,
    [ProfileTab.Collections]: null,
    [ProfileTab.Sold]: null,
    [ProfileTab.Games]: null,
  },
};

export const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileTabData: (state: ProfileState, action: PayloadAction<Partial<ProfileState['profileTabData']>>) => ({
      ...state,
      profileTabData: {
        ...state.profileTabData,
        ...action.payload,
      },
    }),
    updateProfileState: (state: ProfileState, action: PayloadAction<Partial<ProfileState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateSingleProfile: (state: ProfileState, action: PayloadAction<Partial<ProfileState['profile']>>) => ({
      ...state,
      profile: {
        ...state.profile,
        ...action.payload,
      },
    }),
    clearProfile: (state: ProfileState) => ({
      ...state,
      profile: initialProfileData,
    }),
  },
});

export const { updateProfileTabData, updateProfileState, clearProfile, updateSingleProfile } = profileReducer.actions;

export default profileReducer.reducer;
