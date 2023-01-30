import { Fragment, lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { RoutesProps } from 'types';

import { formatRoutesToArr } from './formatRoutesToArr';

export default function getLazyRoutes(routes: RoutesProps, loggedIn: boolean) {
  const routesArr = formatRoutesToArr(routes).map(
    ({
      dirName,
      root: {
        path,
        title,
        isProtected,
        module: configModule,
        component: { props },
      },
      ...nested
    }) => {
      const Component = lazy(() =>
        import(`modules/${configModule}/pages/${dirName}`).then((module) => ({ default: module[dirName] })),
      );

      const hasNestedRoutes = Object.keys(nested).length;

      if (hasNestedRoutes) {
        return (
          <Fragment key={path}>
            {getLazyRoutes(nested, loggedIn)}
            <Route
              key={path}
              path={path}
              element={isProtected && !loggedIn ? <Navigate to="/" /> : <Component title={title} {...props} />}
            />
          </Fragment>
        );
      }
      return (
        <Route
          key={path}
          path={path}
          element={isProtected && !loggedIn ? <Navigate to="/" /> : <Component title={title} {...props} />}
        />
      );
    },
  );
  return routesArr.flat();
}
