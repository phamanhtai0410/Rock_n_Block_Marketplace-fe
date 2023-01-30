import { ChangeEvent, FC, useCallback } from 'react';
import { Box, IconButton, SxProps, TextField, Theme, Typography } from '@mui/material';
import { MinusRounded, PlusRounded } from 'components/Icon/components';
import { validateOnlyNumbers } from 'hooks/useValidateInputField';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export type QuantityInputProps = {
  value?: number;
  name?: string;
  onChange: (value: number) => void;
  maxAmount?: number;
  minAmount?: number;
  placeholder?: string;
  withTitle?: boolean;
  title?: string;
  sx?: SxProps<Theme>;
  size?: 'default' | 'small';
  error?: boolean;
};

export const QuantityInput: FC<QuantityInputProps> = ({
  value = 0,
  withTitle = true,
  name = 'quantity',
  title = 'Quantity',
  onChange,
  maxAmount,
  minAmount = 1,
  placeholder = '0',
  sx,
  size = 'default',
  error,
}) => {
  const handleIncrementQuantity = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const handleDecrementQuantity = useCallback(() => {
    onChange(value - 1);
  }, [value, onChange]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = event.target;
      if (validateOnlyNumbers({ value: inputValue }) && (!maxAmount || +inputValue <= maxAmount)) {
        onChange(+inputValue);
      }
    },
    [maxAmount, onChange],
  );

  return (
    <>
      {withTitle && (
        <Typography
          align="center"
          variant="body1"
          className="s"
          sx={{
            mt: 4,
            fontWeight: FontWeights.fontWeightMedium,
          }}
        >
          {title}
        </Typography>
      )}
      <Box
        sx={{
          ...flexHelper(),
          justifyContent: 'flex-start',
          mt: 1.5,
          '& > *:not(:last-child)': {
            mr: 1.5,
          },
          ...sx,
        }}
      >
        <IconButton disabled={+value <= minAmount} onClick={handleDecrementQuantity}>
          <MinusRounded />
        </IconButton>
        <TextField
          onChange={handleInputChange}
          value={value}
          name={name}
          sx={{
            maxWidth: size === 'default' ? 140 : 80,
            fontSize: '20px',
            input: {
              textAlign: 'center',
            },
          }}
          placeholder={placeholder}
          error={error}
          onBlur={(event) => {
            if (!Number(event.target.value)) {
              onChange(1);
            }
          }}
        />
        <IconButton disabled={maxAmount ? +value >= maxAmount : false} onClick={handleIncrementQuantity}>
          <PlusRounded />
        </IconButton>
      </Box>
    </>
  );
};
