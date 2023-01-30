import { GameCompanyList } from 'types/api/GameCompanyList';
import { GameCategoryType, GameCompanyType, GameSubcategoryType, Nullable } from 'types/index';

export type GameList = {
  resultsPerPage?: number;
  total?: number;
  totalPages?: number;
  results?: Array<GameCompanyList>;
};

export type GamesState = {
  games: Nullable<GameList>;
  ownedGames: Array<GameCompanyList>;
  game: Nullable<GameCompanyType>;
  category: Nullable<GameCategoryType>;
  subcategory: Nullable<GameSubcategoryType>;

  filterGames: GameCompanyList[];
  totalFilterGamesPages: number;
};

export enum GameTab {
  Items = 'items',
  Activity = 'activity',
}
