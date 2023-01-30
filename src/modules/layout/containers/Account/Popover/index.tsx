import { FC, RefObject } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Popover, styled, Switch, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { Icon } from 'components';
import { ChainSelect } from 'components/ChainSelect';
import { useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { toggleTheme } from 'store/user/reducer';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { TextFieldLabel } from 'theme/variables';
import { Chains, Themes, Token } from 'types';
import { copyToClipboard, flexHelper, getToastMessage, shortenPhrase } from 'utils';
import { shortenName } from 'utils/shortenName';

interface AccountModalProps {
  address: string;
  userName: string;
  tokens: Token[];
  visible: boolean;
  anchorEl: RefObject<HTMLElement>;
  onClose: () => void;
  onDisconnect: () => void;
}

const BalanceBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.themeColors.colorPriceBoxBg,
  padding: theme.spacing(1.5, 2),
  borderRadius: '16px',
  '& + &': {
    marginTop: theme.spacing(1),
  },
}));

const MenuItem = styled(Box)(({ theme }) => ({
  color: COLOR_NEUTRALS_4,
  fontSize: '14px',
  fontWeight: FontWeights.fontWeightBold,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& + &': {
    marginTop: theme.spacing(3),
  },
  '& svg': {
    marginRight: theme.spacing(1),
  },
}));

const BalanceTitle = styled(Typography)(() => ({
  color: COLOR_NEUTRALS_4,
  fontSize: 12,
}));

const BalanceContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: theme.spacing(1),
  },
}));

export const AccountPopover: FC<AccountModalProps> = ({
  address: userAddress,
  userName = 'User Name',
  anchorEl,
  visible,
  tokens,
  onClose,
  onDisconnect,
}) => {
  const dispatch = useDispatch();
  const currentTheme = useShallowSelector(userSelector.getProp('theme'));

  const {
    provider,
    user: { id },
  } = useShallowSelector(userSelector.getUser);
  const { connect } = useWalletConnectorContext();

  const isCurrentThemeDark = currentTheme === Themes.dark;

  const handleToogleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleCopyUserAddress = async () => {
    const isCopied = await copyToClipboard(userAddress);
    if (isCopied) {
      getToastMessage('success', 'Copied!');
    }
  };

  return (
    <Popover
      anchorEl={anchorEl.current}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={visible}
      onClose={onClose}
      sx={() => ({
        '& .MuiPopover-paper': {
          mt: { xs: 2, sm: 2, md: 1 },
          px: 2,
          py: 4,
          width: '256px',
          borderRadius: '12px',
          height: { xs: 400, sm: 'auto' },
          marginLeft: { xs: 2, sm: 0 },
        },
      })}
    >
      <Box>
        <Typography variant="h5" sx={(theme) => ({ marginBottom: theme.spacing(0.5) })}>
          {shortenName(userName)}
        </Typography>
        <Typography
          sx={(theme) => ({
            color: COLOR_NEUTRALS_4,
            marginBottom: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          {shortenPhrase(userAddress, 10, 5)}
          <Icon.Copy sx={{ cursor: 'pointer' }} onClick={handleCopyUserAddress} />
        </Typography>

        <TextFieldLabel>Blockchain</TextFieldLabel>
        <ChainSelect
          sx={{ width: '100%', marginBottom: 1, '.MuiInputBase-root': { background: 'none' } }}
          onChange={(e) => connect(provider, e.target.value as Chains, false, true)}
        />

        {tokens.map(({ symbol, image, userBalance }) => (
          <BalanceBox key={symbol}>
            <BalanceTitle>Balance</BalanceTitle>
            <BalanceContent>
              <Box component="img" src={image} alt="icon" width={28} sx={{ mr: 1 }} />
              <Typography fontWeight={FontWeights.fontWeightSemiBold}>
                {userBalance || '0'} {symbol}
              </Typography>
            </BalanceContent>
          </BalanceBox>
        ))}
        <Box
          sx={(theme) => ({
            marginTop: theme.spacing(3),
            a: {
              all: 'unset',
              ...flexHelper(),
            },
          })}
          component="ul"
        >
          <MenuItem component="li">
            <Link to={routes.profile.root.getPath(id)}>
              <Icon.User /> My profile
            </Link>
          </MenuItem>
          <MenuItem component="li">
            <Link to={routes.profile.root.getPath(id)}>
              <Icon.GalleryTwoMount />
              My items
            </Link>
          </MenuItem>
          <MenuItem onClick={handleToogleTheme} component="li">
            <Icon.LightBulb /> Dark theme
            <Switch sx={{ marginLeft: 'auto' }} checked={isCurrentThemeDark} />
          </MenuItem>
          <MenuItem component="li" onClick={onDisconnect}>
            <Icon.Logout /> Disconnect
          </MenuItem>
        </Box>
      </Box>
    </Popover>
  );
};
