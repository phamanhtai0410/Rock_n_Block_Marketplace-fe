import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routes as appRoutes } from 'appConstants';
import { camelCase } from 'lodash';
import { RoutesProps } from 'types';
import { toTitleCase } from 'utils';

export type BreadcrumbsPath = {
  path: string;
  label: string;
};

export const useBreadcrumbs = () => {
  const { pathname, search } = useLocation();

  const baseUrl = useMemo(() => appRoutes?.home?.root?.path?.replace(/\//g, '') ?? {}, []);

  return useMemo<[BreadcrumbsPath[], string]>(() => {
    // getting array of routes for breadcrumbs single links
    const pathParts = pathname
      .split('/')
      .slice(1)
      .filter((path) => path);
    let title = '';
    let crumbsPaths: BreadcrumbsPath[] = [];

    let iterationIndexToBeSkipped = -1; // if next part in pathParts isDynamic = true

    // mapping of routes in the path and return
    // crumbsPaths Array of objects {path, label}
    pathParts.reduce(
      (acc, rawPart, index) => {
        if (iterationIndexToBeSkipped === index) {
          return acc;
        }
        // need to perform camelCase due to part can be consisted with more than 1 word (separated by '-' or ' ' or any separator)
        const part = camelCase(rawPart);
        const { routes }: RoutesProps = acc;
        if (baseUrl === part) {
          title = appRoutes.home.root.title;
          crumbsPaths = [];
          crumbsPaths.push({
            path: appRoutes.home.root.path,
            label: appRoutes.home.root.title,
          });
          return {
            path: appRoutes.home.root.path,
            routes: appRoutes,
          };
        }
        const newRoutes = routes[part];

        if (newRoutes === undefined && !newRoutes?.isDynamic && !newRoutes?.isVisibleDynamic) {
          title = '';
          crumbsPaths = [];
          return {
            path: '/',
            routes: {},
          };
        }

        if (!newRoutes?.root.isNavItem) {
          return {
            path: acc.path,
            routes: newRoutes,
          };
        }
        const nextPart = pathParts[index + 1];

        if (newRoutes?.root.isDynamic && !newRoutes?.[nextPart]?.root.isDynamic) {
          // if the next route in the path is dynamic
          iterationIndexToBeSkipped = index + 1; // crumbs path will exclude next dynamic route

          if (newRoutes?.root?.isVisibleDynamic) {
            iterationIndexToBeSkipped = index + 1; // crumbs path will exclude next dynamic route
            const newPath = `/${pathParts.slice(0, index + 2).join('/')}`;
            const label = `${pathParts[iterationIndexToBeSkipped]}`;

            crumbsPaths.push({
              path: search ? toTitleCase(decodeURI(newPath) + search) : newPath,
              label: decodeURIComponent(label),
            });

            return {
              path: newPath,
              routes: newRoutes,
            };
          }

          const path = pathParts[index];

          crumbsPaths.push({
            path,
            label: newRoutes?.root.title,
          });

          return {
            path,
            routes: newRoutes,
          };
        }

        // if the next route in the path is not dynamic
        // it pushes into crumbs array
        const path = `/${pathParts.slice(0, index + 1).join('/')}`;
        crumbsPaths.push({
          path,
          label: newRoutes?.root.title,
        });

        title = newRoutes?.root.title;
        return {
          path,
          routes: newRoutes,
        };
      },
      {
        path: '/',
        routes: appRoutes,
      },
    );
    return [crumbsPaths, title];
  }, [pathname, baseUrl]);
};
