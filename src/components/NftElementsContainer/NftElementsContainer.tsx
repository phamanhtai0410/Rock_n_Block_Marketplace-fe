/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { ITEMS_PER_PAGE_8 } from 'appConstants';
import { GridContainer } from 'components/GridContainer';
import { NftCardSkeleton } from 'components/NftCard/components/NftCardSkeleton';

export type NftElementsContainerProps = {
  nftElements?: JSX.Element[];
  isLoading: boolean;
  page: number;
};

export const NftElementsContainer: FC<NftElementsContainerProps> = ({ nftElements, page, isLoading }) => {
  return (
    <GridContainer>
      {isLoading
        ? [
            ...[page === 1 ? [] : nftElements],
            ...Array(ITEMS_PER_PAGE_8)
              .fill('')
              .map((_, index) => <NftCardSkeleton key={index} />),
          ]
        : nftElements}
    </GridContainer>
  );
};
