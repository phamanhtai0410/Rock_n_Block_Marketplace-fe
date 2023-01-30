import { Box, Button, Divider, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { COLOR_PRIMARY_1, COLOR_WHITE_BASE } from 'theme/colors';
import { Nullable } from 'types';
import { Currency } from 'types/api/Currency';

import { PromotionData } from '../../Pricing.types';

export interface PricingCardProps {
  price: string;
  days: number;
  packageNumber?: number;
  onPromotionSelect: (promotionData: PromotionData) => void;
  onPromotionBuy: () => void;
  selectedPromotionData: Nullable<PromotionData>;
  rates: Currency[];
}

export const PricingCard = ({
  price,
  days,
  onPromotionSelect,
  onPromotionBuy,
  selectedPromotionData,
  packageNumber,
  rates,
}: PricingCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        padding: 4,
        backgroundColor: theme.themeColors.colorFooterBackground,
        borderRadius: 8,
      }}
    >
      <Box>
        <Typography variant="h3" textAlign="center" sx={{ marginBottom: 1 }}>
          ${price}
        </Typography>
      </Box>
      <Typography
        sx={{
          backgroundColor: theme.themeColors.colorIconButtonSquareBackground,
          width: 'fit-content',
          marginBottom: 2,
          padding: theme.spacing(0.5, 3),
          borderRadius: 16,
          marginX: 'auto',
        }}
      >
        {days} {days > 1 ? 'days' : 'day'}
      </Typography>
      <Divider flexItem sx={{ marginBottom: 3 }} />
      <Box sx={{ marginBottom: 3 }}>
        <Tabs
          className="outlined"
          orientation="vertical"
          value={`${selectedPromotionData?.package}/${selectedPromotionData?.currency}`}
        >
          {rates.map(({ symbol, image }) => (
            <Tab
              key={symbol}
              value={`${packageNumber}/${symbol}`}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ marginRight: 1, width: 32, height: 32 }} component="img" alt="token" src={image} />
                  <Box>{symbol}</Box>
                  <Box
                    sx={{
                      marginLeft: 'auto',
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: theme.themeColors.colorCardBackground,
                      border: `1px solid ${theme.themeColors.colorCardBorder}`,
                      ...(selectedPromotionData?.package === packageNumber &&
                        selectedPromotionData?.currency === symbol && {
                          background: COLOR_WHITE_BASE,
                          border: `6px solid ${COLOR_PRIMARY_1}`,
                        }),
                    }}
                  />
                </Box>
              }
              sx={{
                backgroundColor: theme.themeColors.colorTabPricingBackground,
                marginBottom: 1,
                width: '100%',
                maxWidth: 'unset',
              }}
              onClick={() =>
                onPromotionSelect({
                  package: packageNumber,
                  days,
                  usdPrice: price,
                  currency: String(symbol),
                })
              }
            />
          ))}
        </Tabs>
      </Box>
      <Button
        fullWidth
        variant={selectedPromotionData?.package !== packageNumber ? 'outlined' : 'contained'}
        disabled={selectedPromotionData?.package !== packageNumber}
        onClick={onPromotionBuy}
      >
        Pay
      </Button>
    </Box>
  );
};
