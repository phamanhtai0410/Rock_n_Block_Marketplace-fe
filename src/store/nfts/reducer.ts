import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NftsState } from 'types';
import { Token } from 'types/api/Token';

const initialState: NftsState = {
  presearchNfts: undefined,
  exploreNfts: null,
  maxPrice: 0,
  categories: [],
  favoriteTokens: [],
  trendingTokens: [],
};

export const nftsReducer = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    updateNftsState: (state, action: PayloadAction<Partial<NftsState>>) => ({
      ...state,
      ...action.payload,
    }),
    setNfts: (state, action: PayloadAction<Token[]>) => ({
      ...state,
      exploreNfts: {
        ...state.exploreNfts,
        results: action.payload,
      },
    }),
    updatePresearchNfts: (state, action: PayloadAction<NftsState['presearchNfts']>) => ({
      ...state,
      presearchNfts: action.payload,
    }),
    clearNfts: (state) => ({
      ...state,
      exploreNfts: null,
    }),
  },
});

export const { updateNftsState, updatePresearchNfts, clearNfts, setNfts } = nftsReducer.actions;

export default nftsReducer.reducer;
