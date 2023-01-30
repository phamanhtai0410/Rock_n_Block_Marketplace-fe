import type { Dispatch as DispatchReact } from 'react';
import { GamesState } from 'types/store/games';
import { NftsState } from 'types/store/nfts';

/* PLOP_INJECT_IMPORT_STATE */
import { CollectionsState } from './collections';
import { ModalsInitialState } from './modals';
import { NftState } from './nft';
import { NotificationsState } from './notifications';
import { ProfileState } from './profile';
import { UserState } from './user';

export * from './user';
export * from './ui';
export * from './modals';
/* PLOP_INJECT_IMPORT_TYPES */
export * from './collections';
export * from './nft';
export * from './notifications';
export * from 'types/store/nfts';
export * from './profile';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  user: UserState;
  modals: ModalsInitialState;
  /* PLOP_INJECT_MODIFY_STATE */
  collections: CollectionsState;
  nft: NftState;
  notifications: NotificationsState;
  nfts: NftsState;
  profile: ProfileState;
  games: GamesState;
};
