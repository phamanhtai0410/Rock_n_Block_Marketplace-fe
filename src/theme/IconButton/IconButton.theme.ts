import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { BUTTON_TRANSITION_DEFAULT_TIME } from 'theme/variables';

export const getMuiIconButtonOverrides = (theme: Theme): ComponentsOverrides['MuiIconButton'] => ({
  root: {
    padding: 0,
    cursor: 'pointer',
    transition: `color ${BUTTON_TRANSITION_DEFAULT_TIME}`,
    backgroundColor: theme.themeColors.colorIconButtonBackground,
    color: theme.themeColors.colorIconButtonIconDefault,
    boxShadow: theme.themeColors.colorIconButtonBoxShadow,
    borderRadius: '50%',
    '&:hover': {
      color: theme.themeColors.colorIconButtonIconHover,
    },
    ':disabled': {
      backgroundColor: theme.themeColors.colorIconButtonBackground,
      color: theme.themeColors.colorIconButtonIconDisabled,
    },
  },
  sizeSmall: {
    background: 'none !important',
    boxShadow: 'none',
    '&.border': {
      width: 40,
      height: 40,
      border: `1px solid ${theme.themeColors.colorIconButtonBorder}`,
    },
    '&.borderHover': {
      width: 40,
      height: 40,
      '&:hover': {
        border: `1px solid ${theme.themeColors.colorIconButtonBorder}`,
      },
    },
    '&.square': {
      padding: theme.spacing(1.25),
      borderRadius: 8,
      background: `${theme.themeColors.colorIconButtonSquareBackground} !important`,
    },
    '&.rounded': {
      padding: theme.spacing(1.25),
      background: `${theme.themeColors.colorIconButtonSquareBackground} !important`,
      borderRadius: '50%',
    },
    '&.xs': {
      width: 32,
      height: 32,
    },
  },
  sizeMedium: {
    width: 48,
    height: 48,
    '&.withBackground': {
      background: `${theme.themeColors.colorIconButtonSquareBackground} !important`,
    },
  },
  sizeLarge: {
    width: 80,
    height: 80,
  },
});

export const getMuiIconButtonDefaultProps = (): ComponentsProps['MuiIconButton'] => ({
  disableFocusRipple: true,
  disableRipple: true,
  size: 'small',
});
