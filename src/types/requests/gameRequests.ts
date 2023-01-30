import { NavigateFunction } from 'react-router';
import { Collection } from 'types/api/Collection';
import { GameCategory } from 'types/api/GameCategory';
import { GameCompany } from 'types/api/GameCompany';
import { Network } from 'types/api/Network';
import { WithId } from 'types/requests/index';

export enum ItemTypeVariant {
  category = 'category',
  subcategory = 'subcategory',
  collection = 'collection',
}

export interface GameSubCategory {
  addressList?: Array<{ address: string }>;
  avatar?: string;
  collections?: string;
  id?: number;
  name?: string;
}

export type Addresses = {
  addresses: Array<{ address: string }>;
};

export type Owner = {
  owner?: string;
};

export type GameSubCategoryType = Omit<GameSubCategory, 'addressList'> & { addressList: Array<{ address: string }> };

export interface GameCategoryType extends Omit<GameCategory, 'addressList' | 'subcategories' | 'owner' | 'id'>, Owner {
  addressList?: Array<{ address: string }>;
  subcategories: GameSubCategoryType[];
  id: number | string;
}

export interface GameSubcategoryType extends Omit<GameSubCategory, 'collections'>, Owner {
  collections?: Collection[];
}

export interface GameCompanyType extends Omit<GameCompany, 'categories'> {
  categories?: GameCategoryType[];
}

export interface IGameCompany extends GameCompanyType {
  removeAvatar?: boolean;
  removeBanner?: boolean;
}

export type WithQueryNetwork = {
  network: Required<Network>['name'];
};

export type GameSubCategoryAction = {
  id?: number;
  addresses?: Array<{ address: string }>;
} & Pick<GameSubCategory, 'name'>;

export type GameCategoryAction = {
  subcategories: Array<GameSubCategoryAction>;
} & Pick<GameCategory, 'name'>;

export type ListGameReq = {
  network: string;
  categories: Array<GameCategoryAction>;
} & Pick<GameCompany, 'name' | 'whitepaperLink' | 'email'>;

export type GetGameReq = {
  gameName: string;
} & WithQueryNetwork;

export type UpdateGameReq = {
  data: FormData | Partial<IGameCompany>;
} & GetGameReq;

export type EditGameReq = {
  data: Partial<GameCompany>;
} & WithId &
  WithQueryNetwork;

export type GetCategoryReq = {
  gameId: string;
  categoryId: string;
} & WithQueryNetwork;

export interface AddCategoryReq extends WithId, WithQueryNetwork {
  navigate?: NavigateFunction;
  data: GameCategoryAction[];
}

export type GameCategoryPatchReq = {
  avatar?: string | null;
} & GameCategoryAction;

export interface EditCategoryReq extends GetCategoryReq {
  navigate?: NavigateFunction;
  data: GameCategoryPatchReq;
}

export type AddSubcategoryReq = {
  navigate?: NavigateFunction;
  gameId: string;
  categoryId: string;
  data: GameSubCategoryAction;
} & WithQueryNetwork;

export type GetSubcategory = {
  subcategoryId: string;
} & GetCategoryReq;

export type AddCollectionsReq = {
  data: Addresses;
} & GetSubcategory;

export type DeleteGameReq = {
  id: number | string;
  params?: any; // TODO: fix type
};
export type DeleteGameItemReq = {
  itemType: keyof typeof ItemTypeVariant;
} & Pick<DeleteGameReq, 'id'>;
