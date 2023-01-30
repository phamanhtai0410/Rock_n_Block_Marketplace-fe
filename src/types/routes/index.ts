import { ReactElement } from 'react';
import { Modules } from 'appConstants';

export interface RootRouteProps {
  id: number;
  title: string;
  path: string;
  component: ReactElement;
  isNavItem?: boolean;
  isDynamic?: boolean;
  isProtected?: boolean;
  getPath?: (id: number) => string;
  module: Modules;
}
export interface RouteProps {
  dirName: string;
  root: RootRouteProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

export interface RoutesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

export type WithNetwork = {
  network: string;
};

export interface CategoryPathProps {
  gameId: string | number;
  categoryId: string | number;
}

export interface SubcategoryPathProps extends CategoryPathProps, WithNetwork {
  subcategoryId: string | number;
}
