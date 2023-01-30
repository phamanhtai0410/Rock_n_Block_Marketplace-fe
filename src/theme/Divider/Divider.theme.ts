import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const getMuiDividerOverrides = (theme: Theme): ComponentsOverrides['MuiDivider'] => ({
  root: {
    backgroundColor: theme.themeColors.colorDivider,
  },
});
