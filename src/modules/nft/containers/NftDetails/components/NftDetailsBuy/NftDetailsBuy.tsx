import { FC } from 'react';
import { Block } from '@mui/icons-material';
import { BoxProps, Button, Typography, useTheme } from '@mui/material';
import { Amount } from 'components';
import { Card } from 'components/Card';
import { FontWeights } from 'theme/Typography';

export interface NftDetailsBuyProps {
  price: string | number;
  currency: string;
  usdPrice: string | number;
  onBuyClick: () => void;
  isLogged?: boolean;
  openConnectModal?: () => void;
}

export const NftDetailsBuy: FC<NftDetailsBuyProps & BoxProps> = ({
  price,
  currency,
  usdPrice,
  onBuyClick,
  isLogged,
  openConnectModal,
  ...boxRrops
}) => {
  const theme = useTheme();
  return (
    <Card {...boxRrops}>
      <Typography
        fontWeight={FontWeights.fontWeightMedium}
        mb={1}
        className="xs"
        color={theme.themeColors.colorTextBody2}
      >
        Price from
      </Typography>
      <Amount.Crypto
        sx={{
          fontWeight: FontWeights.fontWeightSemiBold,
          span: {
            color: theme.themeColors.colorTextBody2,
          },
          display: 'block',
          mb: 2,
        }}
        value={price.toString()}
        symbol={currency}
      />
      <Amount.Fiat sx={{ mb: 2 }} value={usdPrice.toString()} />
      <Button variant="contained" fullWidth onClick={isLogged ? onBuyClick : openConnectModal}>
        {isLogged ? 'Buy' : 'Connect wallet'}
      </Button>
    </Card>
  );
};
