import { FC } from 'react';
import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Rates } from 'modules/create/containers/ListForSale';
import { flexHelper } from 'utils';

export type CurrencySelector = {
  sortedCurrencies: Rates[];
  selectedCurrencySymbol: string;
  onCurrencyClick: (currency: Rates) => void;
  isModal?: boolean;
};

export const CurrencySelector: FC<CurrencySelector> = ({
  sortedCurrencies,
  selectedCurrencySymbol,
  onCurrencyClick,
  isModal,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Tabs
      orientation={isSmallScreen ? 'horizontal' : 'vertical'}
      value={selectedCurrencySymbol}
      className="outlined"
      sx={{
        '& .MuiTabs-flexContainer': {
          flexWrap: 'wrap',
        },
      }}
    >
      {sortedCurrencies.map((currency) => {
        const { image, symbol } = currency;
        return (
          <Tab
            key={symbol}
            className="sm"
            value={symbol}
            sx={{
              maxWidth: !isSmallScreen ? '100%' : '114px',
              mr: isSmallScreen ? 2 : 0,
              mb: 2,
            }}
            onClick={() => onCurrencyClick(currency)}
            label={
              <Box sx={{ ...flexHelper() }}>
                <Box sx={{ marginRight: 1, width: 32, height: 32 }} component="img" alt="token" src={image} />{' '}
                <Typography>{symbol}</Typography>
              </Box>
            }
          />
        );
      })}
    </Tabs>
  );
};
