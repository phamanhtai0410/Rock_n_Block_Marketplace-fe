import { Chains } from 'types';
import { GetCollectionActivity, GetCollectionTradeData, WithId } from 'types/requests';
import Web3 from 'web3';

export * from './nft';

export type CreateCollectionAction = {
  collection: FormData;
  network: Chains;
  web3: Web3;
};

export type EditFormFieldsAction = {
  data: FormData;
} & WithId;

export type GetCollectionTradeDataAction = GetCollectionTradeData;

export type GetCollectionActivityAction = GetCollectionActivity;
