import { AutocompleteProps, Box, CircularProgress, List, MenuItem, Popper, TextField, useTheme } from '@mui/material';
import { AutocompleteScrollEnd, AutocompleteScrollEndProps } from 'components/AutocompleteScrollEnd';
import { SelectArrowDown } from 'components/Icon/components';
import { shortenPhrase } from 'utils';

import { CollectionValue } from '../../Filters';

interface CollectionSelectProps {
  isLoading?: boolean;
}

export const CollectionSelect = ({
  isLoading,
  sx,
  ...props
}: Omit<AutocompleteProps<CollectionValue, false, false, false>, 'onScroll' | 'renderInput'> &
  AutocompleteScrollEndProps &
  CollectionSelectProps) => {
  const theme = useTheme();

  return (
    <AutocompleteScrollEnd
      filterOptions={(options) => options}
      filterSelectedOptions
      popupIcon={<SelectArrowDown />}
      PopperComponent={Popper}
      PaperComponent={Box}
      ListboxComponent={List}
      componentsProps={{
        paper: { sx: { maxHeight: 300, marginTop: 2, marginBottom: 2 } },
      }}
      ListboxProps={{
        style: { maxHeight: 300 },
      }}
      {...props}
      renderInput={(inputProps) => (
        <TextField
          {...inputProps}
          InputProps={{
            ...inputProps.InputProps,
            endAdornment: (
              <>
                {isLoading && <CircularProgress color="inherit" size={20} sx={{ marginRight: 1 }} />}

                {inputProps.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{ height: 52 }}
        />
      )}
      renderOption={(optionProps, option) => (
        <MenuItem {...optionProps} key={option.value}>
          {shortenPhrase(option.label, 14, 6)}
        </MenuItem>
      )}
      sx={{
        width: '100%',
        '.MuiAutocomplete-endAdornment': {
          width: 30,
          height: 30,
          right: 9,
          border: `1px solid ${theme.themeColors.colorSelectIconBorder}`,
          borderRadius: '50%',
          button: { width: '100%', height: '100%', svg: { visibility: 'visible' } },
        },
        ...sx,
      }}
    />
  );
};
