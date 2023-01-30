import { GameCategory } from 'types/api/GameCategory';
import { GameSubCategory } from 'types/api/GameSubCategory';

export enum Currency {
  Ethereum = 'Ethereum',
}

export type Subcategory = {
  addresses: Array<{ address: string }>;
} & Pick<GameSubCategory, 'name' | 'avatar'>;

export type Category = {
  subcategories: Array<Subcategory>;
} & Pick<GameCategory, 'name'>;

export interface IListFormInputs {
  name: string;
  email: string;
  network: string;
  whitepaperLink: string;
  description: string;
  site: string;
  twitter: string;
  telegram: string;
  instagram: string;
  discord: string;
  medium: string;
  categories: Array<Category>;
}
