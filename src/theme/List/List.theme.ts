import { ComponentsOverrides, Theme } from '@mui/material';

export const getMuiListOverrides = (theme: Theme): ComponentsOverrides['MuiList'] => ({
  root: {
    backgroundColor: `${theme.themeColors.colorMenuList} !important`,
    border: `2px solid ${theme.themeColors.colorMenuListBorder}`,
    borderRadius: '12px',
  },
});
