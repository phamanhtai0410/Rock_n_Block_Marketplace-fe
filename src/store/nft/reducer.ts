import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NftState } from 'types';

const initialState: NftState = {
  nft: null,
  ownedTokenAmount: '',
  relatedTokens: [],
  promotion: null,
};

export const nftReducer = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    updateNftState: (state, action: PayloadAction<Partial<NftState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateNftState } = nftReducer.actions;

export default nftReducer.reducer;
