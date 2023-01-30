import { ChangeEvent, FC, useCallback } from 'react';
import { FormControlLabel, Radio, RadioGroup, Stack, useTheme } from '@mui/material';
import { initialListingOptions, Listings } from 'modules/create/containers';

export type OptionSelectorProps = {
  options: typeof initialListingOptions;
  onSelect: (value: Listings) => void;
  value: Listings;
};

export const OptionSelector: FC<OptionSelectorProps> = ({ value, options, onSelect }) => {
  const onOptionClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSelect(e.target.value as Listings);
    },
    [onSelect],
  );

  const theme = useTheme();

  return (
    <RadioGroup
      value={value}
      onChange={onOptionClick}
      name="listType"
      sx={{
        '&:after': {
          content: '""',
          mt: 2.5,
          borderBottom: theme.themeColors.colorModalsBorderBottom,
        },
      }}
    >
      <Stack
        spacing={3}
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        justifyContent="flex-start"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        {options.map((optionValue) => (
          <FormControlLabel value={optionValue} key={optionValue} control={<Radio />} label={optionValue} />
        ))}
      </Stack>
    </RadioGroup>
  );
};
