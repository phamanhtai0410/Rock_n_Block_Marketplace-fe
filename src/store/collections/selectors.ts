import { createSelector } from '@reduxjs/toolkit';
import type { CollectionsState, State } from 'types';
import { transformPropertiesData } from 'utils';

const collectionsSelectors = {
  getCollections: (state: State): CollectionsState => state.collections,
  getProp:
    <T extends keyof CollectionsState>(propKey: T) =>
    (state: State) =>
      state.collections[propKey],
};

export const selectCollectionItems = createSelector(
  (state: State) => state.collections.collections,
  (collections) =>
    collections?.map(({ url, name, network }) => ({
      title: name as string,
      value: url as string,
      network: network?.name as string,
    })),
);

export const selectCollectionProperties = createSelector(
  (state: State) => state.collections.singleCollection?.properties,
  (properties) => (properties ? transformPropertiesData(properties) : []),
);

export default collectionsSelectors;
