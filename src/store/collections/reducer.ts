import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionsState, ICollection } from 'types';

const initialState: CollectionsState = {
  key: '',
  singleCollection: null,

  collections: [],
  totalCollectionPages: 1,
  myCollections: [],
  topCollections: null,
  maxRoyalty: 0,
  topCollectionPeriod: 0,

  collectionActivityAveragePrice: 0,
  collectionActivityVolume: 0,
  collectionActivity: null,
  collectionChart: [],
};

export const collectionsReducer = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    updateCollectionsState: (state, action: PayloadAction<Partial<CollectionsState>>) => ({
      ...state,
      ...action.payload,
    }),
    setSingleCollection: (state, action: PayloadAction<ICollection>) => ({
      ...state,
      singleCollection: action.payload,
    }),
  },
});

export const { updateCollectionsState, setSingleCollection } = collectionsReducer.actions;

export default collectionsReducer.reducer;
