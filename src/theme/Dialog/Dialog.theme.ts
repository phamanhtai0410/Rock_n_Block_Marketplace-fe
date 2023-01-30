import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { BORDER_RADIUS_MEDIUM } from 'theme/variables';

export const getMuiDialogOverrides = (theme: Theme): ComponentsOverrides['MuiDialog'] => ({
  root: {},

  paper: {
    background: theme.themeColors.colorDialogBackground,
    borderRadius: BORDER_RADIUS_MEDIUM,
  },
});

export const getMuiDialogDefaultProps = (): ComponentsProps['MuiDialog'] => ({});
