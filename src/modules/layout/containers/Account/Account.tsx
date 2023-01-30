import { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, useMediaQuery } from '@mui/material';
import { mockAva } from 'assets/images';
import { Avatar } from 'components';
import { useModal, useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { Token } from 'types';

import { AccountPopover } from './Popover';

export interface AccountProps {
  onDisconnect: () => void;
  avatar: string;
  address: string;
  userName: string;
  nativeBalance: string;
  tokens: Token[];
}

export const Account: FC<AccountProps> = ({ avatar, address, userName, nativeBalance, tokens, onDisconnect }) => {
  const popoverRef = useRef(null);
  const [isAccountInfoVisible, onOpenAccountInfo, onCloseAccountInfo] = useModal(false);

  const { chain } = useShallowSelector(userSelector.getUser);

  const handleDisconnect = () => {
    onCloseAccountInfo();
    onDisconnect();
  };

  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:685px)');

  useEffect(() => {
    onCloseAccountInfo();
  }, [location.pathname, onCloseAccountInfo]);

  return (
    <>
      <Button
        ref={popoverRef}
        variant="outlined"
        size="small"
        sx={{
          padding: 0.25,
          paddingRight: 2,
          ...(isSmallScreen && { paddingRight: 0.25, minWidth: '48px', border: 'none' }),
        }}
        onClick={onOpenAccountInfo}
      >
        <Avatar sx={{ mr: { xs: 0, sm: 1 } }} image={avatar || mockAva} />
        <Box sx={{ marginRight: '4px', display: isSmallScreen ? 'none' : 'block' }}>{nativeBalance}</Box>
        <Box color={COLOR_PRIMARY_1} sx={{ display: isSmallScreen ? 'none' : 'block' }}>
          {chain.nativeCurrency.symbol}
        </Box>
      </Button>

      {isAccountInfoVisible && (
        <AccountPopover
          address={address}
          userName={userName}
          tokens={tokens}
          anchorEl={popoverRef}
          visible={isAccountInfoVisible}
          onClose={onCloseAccountInfo}
          onDisconnect={handleDisconnect}
        />
      )}
    </>
  );
};
