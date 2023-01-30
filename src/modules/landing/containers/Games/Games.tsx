/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { ITEMS_PER_PAGE_9, routes } from 'appConstants';
import { Carousel } from 'components';
import { GameCard } from 'components/GameCard';
import { Gamepad } from 'components/Icon/components';
import { useShallowSelector } from 'hooks';
import { GameCardSkeleton } from 'modules/games/components';
import actionTypes from 'store/games/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import { GameList } from 'types/store/games';
import { flexHelper } from 'utils';

export type GamesProps = {
  games: GameList['results'];
};

export const Games: FC<GamesProps> = ({ games }) => {
  const theme = useTheme();
  const { [actionTypes.GET_GAMES_DATA]: fetchingGames } = useShallowSelector(uiSelector.getUI);
  const isGamesDataLoading = fetchingGames === RequestStatus.REQUEST;

  return (
    <Box sx={{ position: 'relative', zIndex: 10 }}>
      <Carousel
        loop
        swiperProps={{
          slidesPerView: 1.5,
          breakpoints: {
            [theme.breakpoints.values.xs]: {
              slidesPerView: 1.2,
              spaceBetween: 32,
            },
            [theme.breakpoints.values.sm]: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            [theme.breakpoints.values.md]: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            [theme.breakpoints.values.lg]: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          },
        }}
        header={
          <Box sx={{ ...flexHelper('space-between', 'center'), mb: 5 }}>
            <Stack direction="row" spacing={2.5}>
              <Typography variant="h4" letterSpacing="-0.01em">
                Games
              </Typography>
              <Gamepad />
            </Stack>
            <Button
              component={Link}
              to={routes.games.root.path}
              variant="text"
              className="withoutHover"
              sx={{ color: theme.themeColors.colorButtonSecondaryText, textDecoration: 'underline', p: 0 }}
            >
              See all
            </Button>
          </Box>
        }
      >
        {isGamesDataLoading
          ? Array(ITEMS_PER_PAGE_9)
              .fill('')
              .map((_, index) => <GameCardSkeleton key={index} />)
          : games?.map((game) => <GameCard key={game.id} {...game} sx={{ height: 'auto' }} />)}
      </Carousel>
    </Box>
  );
};
