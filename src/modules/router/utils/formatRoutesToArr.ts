import { RouteProps, RoutesProps } from 'types';

export const formatRoutesToArr = (routes: RoutesProps): RouteProps[] => {
  return Object.values(routes).map((route) => route);
};
