import { Nullable } from 'types';
import { Activity } from 'types/api/Activity';
import { Collection } from 'types/api/Collection';
import { CollectionStats } from 'types/api/CollectionStats';
import { Currency } from 'types/api/Currency';
import { PaginateActivity } from 'types/api/PaginateActivity';
import { PaginateTopCollections } from 'types/api/PaginateTopCollections';

export interface ICollection extends Omit<Collection, 'currency' | 'subcategoryName'> {
  currency?: Currency;
  subcategoryName?: string | null;
}

export interface IPaginateActivity extends Omit<PaginateActivity, 'results'> {
  results?: Array<Activity & { txHash?: string }>;
}

export type CollectionsState = {
  key: string;
  singleCollection: Nullable<ICollection>;

  collections: ICollection[];
  totalCollectionPages: number;

  myCollections: ICollection[];

  topCollections: PaginateTopCollections | null;
  maxRoyalty: number;
  topCollectionPeriod: number;

  collectionActivityAveragePrice: number;
  collectionActivityVolume: number;
  collectionActivity: IPaginateActivity | null;
  collectionChart: CollectionStats[];
};
