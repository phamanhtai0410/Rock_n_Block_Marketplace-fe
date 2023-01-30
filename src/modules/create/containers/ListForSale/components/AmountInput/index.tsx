import { ChangeEvent, FC } from 'react';
import { Box, Stack, TextField, Typography, useTheme } from '@mui/material';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper, formatCurrency } from 'utils';

export type AmountInputProps = {
  label: string;
  priceValue: string;
  priceInUsd: string;
  onPriceValueChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const AmountInput: FC<AmountInputProps> = ({ label, priceValue, priceInUsd, onPriceValueChange }) => {
  const theme = useTheme();
  return (
    <Stack sx={{ maxWidth: '420px' }}>
      <Typography
        align="center"
        variant="body1"
        sx={{
          color: theme.themeColors.colorModalsText,
          fontSize: '12px',
          lineHeight: '12px',
          fontWeight: FontWeights.fontWeightBold,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
      <TextField
        onChange={onPriceValueChange}
        value={priceValue}
        placeholder="0.00"
        sx={{
          width: '100%',
          mt: 1.5,
          '&:after': {
            content: '""',
            my: 1.5,
            borderBottom: theme.themeColors.colorModalsBorderBottom,
          },
        }}
      />
      <Box sx={{ ...flexHelper('space-between') }}>
        <Typography variant="body1" color={COLOR_NEUTRALS_4}>
          Price in USD
        </Typography>
        <Typography noWrap variant="body1" maxWidth="60%" color={theme.themeColors.colorTabOutlinedTextActive}>
          {formatCurrency(priceInUsd)}
        </Typography>
      </Box>
    </Stack>
  );
};
