import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const getMuiPopoverOverrides = (theme?: Theme): ComponentsOverrides['MuiPopover'] => ({
  root: {
    '.MuiBackdrop-root': {
      background: 'rgba(0,0,0,0)',
    },

    '.MuiPopover-paper': {
      background: theme?.themeColors.colorDialogBackground,
    },
  },
});

export const getMuiPopoverDefaultProps = (): ComponentsProps['MuiPopover'] => ({});
