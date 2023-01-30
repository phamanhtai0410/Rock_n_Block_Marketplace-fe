import { FC, useState } from 'react';
import { Box, Button, styled, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Modal, ModalProps } from 'components';
import { MetamaskLogo, WalletConnectLogo } from 'modules/layout/assets';
import { currentChains } from 'services/WalletService/config';
import { COLOR_NEUTRALS_6 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Chains, WalletProviders } from 'types';

export interface ConnectWalletModalProps extends ModalProps {
  onConnectWallet: (provider: WalletProviders, chain: Chains) => void;
}

const WalletButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  height: '110px',
  borderRadius: '16px',
  fontSize: '22px',
  fontWeight: FontWeights.fontWeightMedium,
  backgroundColor: theme.themeColors.colorPriceBoxBg,
  color: theme.themeColors.colorTextDefault,
  '&:hover': {
    backgroundColor: theme.themeColors.colorIconButtonBorder,
    color: COLOR_NEUTRALS_6,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
    height: '76px',
  },
}));

export const ConnectWalletModal: FC<ConnectWalletModalProps> = ({ onConnectWallet, onClose, open }) => {
  const [selectedChain, setSelectedChain] = useState(Chains.eth);
  const handleConnect = (provider: WalletProviders, chain: Chains) => {
    onConnectWallet(provider, chain);
    onClose();
  };

  const theme = useTheme();

  const handleChangeTab = (_: unknown, newValue: Chains) => setSelectedChain(newValue);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<Typography variant="h4">Connect a Wallet</Typography>}
      sx={{
        svg: { width: '32px', height: '32px' },
      }}
    >
      <Box sx={{ maxWidth: '448px', minHeight: '227px' }}>
        <Typography
          sx={{ marginBottom: theme.spacing(4) }}
          textAlign={{ xs: 'start', sm: 'center' }}
          variant="body1"
          className="s"
        >
          Please select a wallet to connect to this dapp:
        </Typography>
        <Tabs value={selectedChain} onChange={handleChangeTab} variant="scrollable" scrollButtons={false}>
          {currentChains.map((chain) => (
            <Tab
              key={chain.chainId}
              value={chain.id}
              label={chain.name}
              sx={{ '&.Mui-selected': { color: theme.themeColors.colorTabItemTextActive }, mr: 1 }}
            />
          ))}
        </Tabs>
        <Box mt={2}>
          <WalletButton
            variant="outlined"
            color="secondary"
            startIcon={<MetamaskLogo />}
            onClick={() => handleConnect(WalletProviders.metamask, selectedChain)}
            sx={{
              marginBottom: theme.spacing(1),
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
            }}
          >
            MetaMask
          </WalletButton>
          <WalletButton
            variant="outlined"
            color="secondary"
            sx={{ textTransform: 'capitalize' }}
            startIcon={<WalletConnectLogo />}
            onClick={() => handleConnect(WalletProviders.walletConnect, selectedChain)}
          >
            WalletConnect
          </WalletButton>
        </Box>
      </Box>
    </Modal>
  );
};
