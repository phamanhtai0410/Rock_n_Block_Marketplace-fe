import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameCategoryType, GameCompanyType } from 'types';
import { GameCompanyList } from 'types/api/GameCompanyList';
import { GamesState } from 'types/store/games';

const initialState: GamesState = {
  games: null,
  ownedGames: [],
  game: null,
  category: null,
  subcategory: null,

  filterGames: [],
  totalFilterGamesPages: 1,
};

export const gamesReducer = createSlice({
  name: 'games',
  initialState,
  reducers: {
    updateGamesState: (state, action: PayloadAction<Partial<GamesState>>) => ({
      ...state,
      ...action.payload,
    }),
    setGame: (state, action: PayloadAction<GameCompanyType>) => ({
      ...state,
      game: action.payload,
    }),
    setGames: (state, action: PayloadAction<GameCompanyList[]>) => ({
      ...state,
      games: {
        ...state.games,
        results: action.payload,
      },
    }),
    setCategory: (state, action: PayloadAction<GameCategoryType>) => ({
      ...state,
      category: action.payload,
    }),
    clearCategory: (state) => ({
      ...state,
      category: null,
    }),
    clearGame: (state) => ({
      ...state,
      game: null,
    }),
  },
});

export const { updateGamesState, setGame, setCategory, clearGame, clearCategory, setGames } = gamesReducer.actions;

export default gamesReducer.reducer;
