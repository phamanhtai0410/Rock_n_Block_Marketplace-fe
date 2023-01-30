import { ICollection, Nullable } from 'types';
import { PaginateCompositeCollection } from 'types/api/PaginateCompositeCollection';
import { PaginateToken } from 'types/api/PaginateToken';
import { User } from 'types/api/User';
import { GameList } from 'types/store/games';

export enum ProfileTab {
  Owned,
  ForSale,
  Bided,
  Favorites,
  Collections,
  Sold,
  Games,
}

export type ProfileState = {
  profile: Required<User>;
  collections: ICollection[];
  profileTabData: {
    [ProfileTab.Owned]: Nullable<PaginateToken>;
    [ProfileTab.ForSale]: Nullable<PaginateToken>;
    [ProfileTab.Bided]: Nullable<PaginateToken>;
    [ProfileTab.Favorites]: Nullable<PaginateToken>;
    [ProfileTab.Collections]: Nullable<PaginateCompositeCollection>;
    [ProfileTab.Sold]: Nullable<PaginateToken>;
    [ProfileTab.Games]: Nullable<GameList>;
  };
};
