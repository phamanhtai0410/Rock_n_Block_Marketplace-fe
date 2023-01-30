import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import { ethMaskAddress, routes } from 'appConstants';
import { MainLogo, Navigation, Notifications } from 'components';
import { Gaming } from 'components/Icon/components';
import { SearchInput } from 'components/SearchInput';
import { useModal, useShallowSelector } from 'hooks';
import { Account } from 'modules/layout/containers/Account';
import { useGetScrollValue } from 'modules/layout/hooks';
import { useWalletConnectorContext } from 'services';
import { searchNfts } from 'store/nfts/actions';
import nftActionTypes from 'store/nfts/actionTypes';
import { updatePresearchNfts } from 'store/nfts/reducer';
import nftSelectors from 'store/nfts/selectors';
import notificationsSelectors from 'store/notifications/selectors';
import uiSelectors from 'store/ui/selectors';
import userSelectors from 'store/user/selectors';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { TRANSITION_DEFAULT_TIME } from 'theme/variables';
import { Chains, WalletProviders } from 'types';
import { useDebouncedCallback } from 'use-debounce';

import { avoidNestedTernary } from '../../utils';
import { ConnectWalletModal } from '../NotificationModal';

interface HeaderProps {
  isLandingPage: boolean;
}

const stylesApplyPoint = 5;

export const Header: FC<HeaderProps> = ({ isLandingPage }) => {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const [isConnectWalletModalOpen, openConnectWalletModal, closeConnectWalletModal] = useModal(false);
  const [scrollToTopValue] = useGetScrollValue();

  const { connect, disconnect } = useWalletConnectorContext();
  const {
    address: userAddress,
    user: { name, avatar },
    tokenData,
  } = useShallowSelector(userSelectors.getUser);
  const nativeBalance = useMemo(() => {
    return tokenData.find(({ address }) => address === ethMaskAddress)?.userBalance;
  }, [tokenData]);
  const { presearchNfts } = useShallowSelector(nftSelectors.getNfts);
  const { headerNotifications } = useShallowSelector(notificationsSelectors.getNotifications);
  const { [nftActionTypes.SEARCH_NFTS]: searchNftsStatus } = useShallowSelector(uiSelectors.getUI);

  const handleConnectWallet = useCallback(
    (provider: WalletProviders, chain: Chains) => {
      connect(provider, chain);
    },
    [connect],
  );
  const handleDisconnectWallet = useCallback(() => disconnect(), [disconnect]);

  const debouncedSearchNfts = useDebouncedCallback((q: string) => dispatch(searchNfts({ query: q })), 300);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setQuery(event.target.value);

      debouncedSearchNfts(event.target.value);
    },
    [debouncedSearchNfts],
  );

  const handleClearResults = useCallback(() => dispatch(updatePresearchNfts(undefined)), [dispatch]);

  const handleResultClick = useCallback(() => {
    handleClearResults();
    setQuery('');
  }, [handleClearResults]);

  const isSmallScreen = useMediaQuery('(max-width:685px)');

  return (
    <Box
      sx={{
        pt: scrollToTopValue <= stylesApplyPoint ? 1.75 : 0.8,
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        background:
          scrollToTopValue <= stylesApplyPoint
            ? avoidNestedTernary(isLandingPage, theme.themeColors.backgroundWithImage, 'transparent')
            : theme.themeColors.colorHeader,
        transition: TRANSITION_DEFAULT_TIME,
        '&:after': {
          content: '""',
          mt: '8px',
          display: 'block',
          borderBottom: !isLandingPage ? `1px solid` : '',
          borderBottomWidth: 'thin',
          //   opacity: '0.2',
          color: theme.themeColors.colorDivider,
        },
        zIndex: 999,
      }}
    >
      <Container>
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={{ xs: 1, md: 2 }}>
          <Link to={routes.home.root.path}>
            <MainLogo />
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', sm: 'block' }, margin: '0 !important' }}
          />
          <SearchInput
            value={query}
            placeholder="Search"
            onChange={handleChange}
            handleResultClick={handleResultClick}
            presearchNfts={presearchNfts}
            searchNftsStatus={searchNftsStatus}
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          />
          <Button
            startIcon={<Gaming sx={{ display: 'flex', color: COLOR_NEUTRALS_4 }} />}
            variant="contained"
            color="secondary"
            size="small"
            sx={{ display: isSmallScreen ? 'none' : 'flex', span: { mr: 1 } }}
            component={Link}
            to={routes.games.root.path}
          >
            Games
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ display: isSmallScreen ? 'none' : 'flex' }}
            component={Link}
            to={routes.explore.root.path}
          >
            Explore
          </Button>
          {userAddress ? (
            <>
              <Notifications notifications={headerNotifications} />
              <Button
                size="small"
                sx={{
                  display: isSmallScreen ? 'none' : 'flex',
                  '&:before': { top: '10%', right: '5%' },
                  height: 'auto',
                }}
                component={Link}
                to={routes.create.root.path}
              >
                Create
              </Button>
              <Account
                avatar={avatar}
                address={userAddress}
                userName={name}
                nativeBalance={nativeBalance || '0'}
                tokens={tokenData}
                onDisconnect={handleDisconnectWallet}
              />
            </>
          ) : (
            <Button variant="outlined" size="small" onClick={openConnectWalletModal}>
              Connect
              <Box component="span" sx={{ display: { xs: 'none', sm: 'block' }, ml: theme.spacing(0.75) }}>
                Wallet
              </Box>
            </Button>
          )}
          {userAddress && <Navigation sx={{ display: isSmallScreen ? 'flex' : 'none' }} />}
        </Stack>
      </Container>
      <ConnectWalletModal
        open={isConnectWalletModalOpen}
        onClose={closeConnectWalletModal}
        onConnectWallet={handleConnectWallet}
      />
    </Box>
  );
};
