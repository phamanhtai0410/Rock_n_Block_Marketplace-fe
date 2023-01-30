import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes as appRoutes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';

import getLazyRoutes from '../../utils/getLazyRoutes';

export const RouteManager: FC = () => {
  const address = useShallowSelector(userSelector.getProp('address'));
  const lazyRotes = useMemo(() => getLazyRoutes(appRoutes, !!address.length), [address.length]);
  const [routes, setRoutes] = useState<ReactElement[] | null>();

  useEffect(() => {
    setRoutes(lazyRotes);
  }, [lazyRotes]);

  if (!routes) {
    return null;
  }

  return (
    <Routes>
      {routes}
      <Route path="*" element={<Navigate to={appRoutes.notFound.root.path} replace />} />
    </Routes>
  );
};
