import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  useTheme,
} from '@mui/material';
import { BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { MenuItemsProps } from 'types';

import { SelectInput } from './theme';

export interface SelectProps {
  menuItems: MenuItemsProps[];
  paperWidth?: string;
  label?: string;
}

export const Select: FC<SelectProps & MuiSelectProps> = ({
  menuItems,
  label,
  id,
  paperWidth = '100%',
  ...selectProps
}) => {
  const theme = useTheme();
  return (
    <FormControl variant="standard">
      {label && <InputLabel id={id}>{label}</InputLabel>}
      <MuiSelect
        variant="filled"
        input={<SelectInput />}
        MenuProps={{
          PaperProps: {
            sx: {
              minHeight: '128px',
              width: paperWidth,
              border: '1px solid',
              borderRadius: BORDER_RADIUS_DEFAULT,
              '& ul': { background: theme.themeColors.colorDialogBackground, border: 'none' },
              '.MuiMenuItem-root': {
                color: theme.themeColors.colorDialogText,
              },
              '.Mui-selected': {
                color: theme.themeColors.colorDialogTextChecked,
              },
            },
          },
        }}
        {...selectProps}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
