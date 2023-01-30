import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

type PathHistory = {
  currentPath: string;
  prevPath: string;
};

export const usePreviousRoute = (): PathHistory => {
  const { pathname } = useLocation();
  const pathnameArr = useMemo(() => pathname.split('/').filter((path) => path), [pathname]);

  const [path, setPath] = useState<PathHistory>({
    currentPath: pathname,
    prevPath: pathname,
  });

  useEffect(() => {
    if (pathname !== path.prevPath) {
      setPath((prevState) => ({ currentPath: pathname, prevPath: prevState.currentPath }));
    }
    if (pathnameArr.length <= 1) {
      setPath({ currentPath: pathname, prevPath: '/' });
    }
  }, [pathname, pathnameArr.length]);

  return {
    currentPath: path.currentPath,
    prevPath: path.prevPath,
  };
};
