import type { NftState, State } from 'types';

const nftSelectors = {
  getNft: (state: State): NftState => state.nft,
  getProp: (propKey: keyof NftState) => (state: State) => state.nft[propKey],
};

export default nftSelectors;
