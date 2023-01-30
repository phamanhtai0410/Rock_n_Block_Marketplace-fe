import { ComponentsOverrides, Theme } from '@mui/material';

export const getMuiMenuOverrides = (theme: Theme): ComponentsOverrides['MuiMenu'] => ({
  paper: {
    backgroundColor: 'transparent !important',
    border: 'none !important',
    borderRadius: '12px !important',
    marginTop: '16px !important',
  },
});

export const getMuiMenuItemOverrides = (theme: Theme): ComponentsOverrides['MuiMenuItem'] => ({
  root: {
    color: theme.themeColors.colorMenuItemText,
    margin: '0 8px',
    '& + &': {
      marginTop: '4px',
    },
    borderRadius: '8px',
    '&:hover': {
      background: theme.themeColors.colorMenuItemBackgroundHover,
    },

    '&.Mui-selected': {
      backgroundColor: theme.themeColors.colorMenuItemSelected,
    },
  },
});
