import { FC, ReactNode, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { GlobalLoader, Spinner } from 'components';
import { useShallowSelector, useSmoothTopScroll } from 'hooks';
import { Breadcrumbs } from 'modules/layout/containers/Header/components';
import { useBreadcrumbs } from 'modules/layout/hooks';
import useAnchorLink from 'modules/layout/hooks/useAnchorLink/useAnchorLink';
import { useCheckPrivateRoute } from 'modules/layout/hooks/useCheckPrivateRoute';
import { useWalletConnectorContext } from 'services';
import { getHeaderNotifications } from 'store/notifications/actions';
import uiSelectors from 'store/ui/selectors';
import { connectToWebsocket, getRates, getServiceFee, getUserData } from 'store/user/actions';
import usersActionTypes from 'store/user/actionTypes';
import userSelectors from 'store/user/selectors';
import { RequestStatus } from 'types';

import { Footer, Header, TransactionModal } from '..';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { walletService } = useWalletConnectorContext();
  const { key, address, chain } = useShallowSelector(userSelectors.getUser);
  const getSelfInfoStatus = useShallowSelector(uiSelectors.getProp(usersActionTypes.GET_SELF_INFO));

  const { pathname } = useLocation();
  const [breadcrumbs] = useBreadcrumbs();

  const firstPathAtPathname = useMemo(() => pathname.split('/')[1], [pathname]);

  useSmoothTopScroll(firstPathAtPathname);
  useAnchorLink();
  useCheckPrivateRoute(pathname);

  const isLandingPage = useMemo(() => pathname === routes.home.root.path, [pathname]);
  const isNotfoundPage = useMemo(() => pathname === routes.notFound.root.path, [pathname]);

  useEffect(() => {
    dispatch(
      getRates({
        web3Provider: walletService.Web3(chain.rpc),
      }),
    );
  }, [dispatch, walletService, address, chain.rpc]);

  useEffect(() => {
    // If user signed message (logged-in)
    if (key) {
      dispatch(
        getUserData({
          web3Provider: walletService.Web3(chain.rpc),
        }),
      );
      dispatch(connectToWebsocket());
      dispatch(getHeaderNotifications({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, key, walletService]);

  useEffect(() => {
    dispatch(getServiceFee({ network: 'Ethereum' }));
  }, [dispatch]);

  if (key && getSelfInfoStatus === RequestStatus.REQUEST) {
    return <Spinner size="xl" position="center" />;
  }

  if (isNotfoundPage) {
    return <Box>{children}</Box>;
  }

  return (
    <>
      <GlobalLoader />
      <Box
        sx={{
          backgroundColor: theme.themeColors.colorBackground,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <Header isLandingPage={isLandingPage} />
        {isLandingPage ? (
          <Box sx={{ pt: 10.5 }}>{children}</Box>
        ) : (
          <Container
            sx={{
              pt: 13.75,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 4,
            }}
          >
            {!isLandingPage && !!breadcrumbs.length && <Breadcrumbs breadcrumbsRoutes={breadcrumbs} />}
            {children}
          </Container>
        )}
        <Footer />
      </Box>
      <TransactionModal />
    </>
  );
};
