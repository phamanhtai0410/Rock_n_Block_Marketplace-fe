import type { State } from 'types';
import { GamesState } from 'types/store/games';

const gamesSelectors = {
  getGames: (state: State): GamesState => state.games,
  getProp:
    <T extends keyof GamesState>(propKey: T) =>
    (state: State): GamesState[typeof propKey] =>
      state.games[propKey],
};

export default gamesSelectors;
