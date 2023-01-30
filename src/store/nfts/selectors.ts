import { createSelector } from '@reduxjs/toolkit';
import type { NftsState, State } from 'types';

const nftsSelectors = {
  getNfts: (state: State): NftsState => state.nfts,
  getProp: (propKey: keyof NftsState) => (state: State) => state.nfts[propKey],
};

export const selectCategoryItems = createSelector(
  (state: State) => state.nfts.categories,
  (categories) => categories.map(({ id, name, image }) => ({ title: name || '', icon: image, id: id || 0 })),
);

export default nftsSelectors;
