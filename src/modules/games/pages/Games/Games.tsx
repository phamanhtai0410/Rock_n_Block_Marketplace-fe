/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ITEMS_PER_PAGE_6, routes } from 'appConstants';
import { BackgroundImageCover, LoadMoreButton, NothingToShow } from 'components';
import { ChainFilter } from 'components/ChainFilter';
import { GameCard } from 'components/GameCard';
import { GridContainer } from 'components/GridContainer';
import { useLoadOnScrollNotEven, useShallowSelector } from 'hooks';
import { useFilters } from 'hooks/useFilters';
import { GameCardSkeleton } from 'modules/games/components';
import { TextFieldWithLabel } from 'modules/layout/containers/Filters';
import { getGames } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import userSelectors from 'store/user/selectors';
import { COLOR_NEUTRALS_6 } from 'theme/colors';
import { TextFieldLabel } from 'theme/variables';
import { RequestStatus } from 'types';
import { fillArray, flexHelper } from 'utils';

export const Games = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { activeNetwork, handleChangeFilter } = useFilters();

  const { [actionTypes.GET_GAMES_DATA]: fetchingGames } = useShallowSelector(uiSelector.getUI);
  const { games } = useShallowSelector(gamesSelectors.getGames);
  const { address: userAddress } = useShallowSelector(userSelectors.getUser);

  const isGamesDataLoading = fetchingGames === RequestStatus.REQUEST;

  const handleLoadMoreClick = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const { ref } = useLoadOnScrollNotEven({
    currentPage,
    loadMore: handleLoadMoreClick,
    config: {},
  });

  useEffect(() => {
    dispatch(
      getGames({
        itemsPerPage: ITEMS_PER_PAGE_6,
        page: currentPage,
        network: activeNetwork,
        shouldConcat: currentPage !== 1,
      }),
    );
  }, [dispatch, currentPage, activeNetwork]);

  const gameElements = useMemo(() => {
    return games?.results?.map((card) => {
      return <GameCard {...card} key={card.id} />;
    });
  }, [games]);

  return (
    <Box sx={{ zIndex: 10 }}>
      <BackgroundImageCover>
        <Grid container spacing={1}>
          <Grid item container alignItems="center" justifyContent="space-between" rowSpacing={1} xs={12}>
            <Grid item xs={12} sm="auto">
              <Typography variant="h2" color={COLOR_NEUTRALS_6}>
                Games
              </Typography>
            </Grid>
            <Grid item xs={12} sm="auto">
              <Button
                component={Link}
                to={routes.games.listGame.root.path}
                size="small"
                fullWidth
                disabled={!userAddress}
              >
                List my game
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextFieldWithLabel>
              <TextFieldLabel isRegular>NETWORK</TextFieldLabel>
              <ChainFilter
                value={activeNetwork}
                onChange={(e) => {
                  setCurrentPage(1);
                  handleChangeFilter('activeNetwork', e.target.value);
                }}
                size="small"
                sx={{ width: '100%' }}
              />
            </TextFieldWithLabel>
          </Grid>
        </Grid>
      </BackgroundImageCover>

      {!games?.results?.length && !isGamesDataLoading ? (
        <NothingToShow sx={{ pt: 16.25 }} />
      ) : (
        <GridContainer columns={3} spacing={3} mt={5}>
          {isGamesDataLoading
            ? [
                ...[currentPage === 1 ? [] : gameElements],
                ...fillArray(ITEMS_PER_PAGE_6).map((_, index) => <GameCardSkeleton key={index} />),
              ]
            : gameElements}
        </GridContainer>
      )}
      <Box sx={{ ...flexHelper(), mb: 7 }}>
        {!isGamesDataLoading && currentPage < (games?.totalPages || 0) && (
          <LoadMoreButton anchorEl={ref} isLoading={isGamesDataLoading} onLoadMore={handleLoadMoreClick} />
        )}
      </Box>
    </Box>
  );
};
