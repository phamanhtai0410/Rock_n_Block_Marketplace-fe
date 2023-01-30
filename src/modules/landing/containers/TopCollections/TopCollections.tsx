/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { NothingToShow, TopCollectionCard, TopCollectionCardProps } from 'components';
import { GridContainer } from 'components/GridContainer';
import { TopCollectionCardSkeleton } from 'components/TopCollectionCard/components/TopCollectionCardSkeleton';
import { useShallowSelector } from 'hooks';
import uiSelector from 'store/ui/selectors';
import userActionTypes from 'store/user/actionTypes';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { RequestStatus } from 'types';

export interface TopCollectionsProps {
  collections?: TopCollectionCardProps[];
  topCollectionPeriod: number;
}

export const TopCollections = ({ collections, topCollectionPeriod }: TopCollectionsProps) => {
  const getHomeDataStatus = useShallowSelector(uiSelector.getProp(userActionTypes.GET_HOME_DATA));
  const isHomeDataLoading = useMemo(() => getHomeDataStatus === RequestStatus.REQUEST, [getHomeDataStatus]);

  return (
    <Box sx={{ position: 'relative', zIndex: 10 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, span: { color: COLOR_PRIMARY_1 } }}>
        Top collections in <span>{topCollectionPeriod}</span> days
      </Typography>
      {!collections?.length ? (
        <NothingToShow sx={{ marginBottom: 4 }} />
      ) : (
        <GridContainer
          columns={3}
          spacing={{ xs: 2, md: 4 }}
          gridItemSx={{ marginBottom: 0 }}
          sx={{ mb: { xs: 0, md: 4 } }}
        >
          {isHomeDataLoading
            ? Array(9)
                .fill('')
                .map((_, index) => <TopCollectionCardSkeleton key={index} />)
            : collections?.map((collection, index) => (
                <TopCollectionCard key={collection.index} {...collection} index={index + 1} />
              ))}
        </GridContainer>
      )}
    </Box>
  );
};
