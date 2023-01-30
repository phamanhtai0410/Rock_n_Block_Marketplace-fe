import { buttonClasses, ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_NEUTRALS_4, COLOR_PRIMARY_3 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { BORDER_RADIUS_BUTTON, BUTTON_TRANSITION_DEFAULT_TIME } from 'theme/variables';

export const getMuiButtonOverrides = (theme: Theme): ComponentsOverrides['MuiButton'] => ({
  root: {
    textAlign: 'center',
    borderRadius: BORDER_RADIUS_BUTTON,
    fontWeight: FontWeights.fontWeightBold,
    padding: theme.spacing(2, 3),
    textTransform: 'none',
    minWidth: '101px',
    fontSize: '16px',
    lineHeight: '16px',
    boxShadow: 'none',
    boxSizing: 'border-box',

    '&:hover': {
      border: 'none',
      boxShadow: 'none',
    },

    [`&.${buttonClasses.disabled}`]: {
      opacity: 0.5,
    },
  },

  startIcon: {
    '&>*:nth-of-type(1)': {
      fontSize: 'inherit',
    },
    marginRight: theme.spacing(1.25),
  },

  endIcon: {
    '&>*:nth-of-type(1)': {
      fontSize: 'inherit',
    },
    overflow: 'hidden',
    marginLeft: theme.spacing(1.25),
  },

  sizeSmall: {
    minWidth: '78px',
    fontSize: '14px',
    lineHeight: '16px',
    padding: theme.spacing(1.5, 2),
    height: '40px',
  },

  contained: {
    color: theme.themeColors.colorButtonNeutralTextDefault,
    background: theme.themeColors.colorButtonNeutralBackgroundDefault,
    position: 'relative',
    zIndex: '1',
    overflow: 'hidden',

    '&::after': {
      position: 'absolute',
      content: '""',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      background: theme.themeColors.colorButtonNeutralBackgroundHover,
      zIndex: '-1',
      opacity: '0',
      transition: BUTTON_TRANSITION_DEFAULT_TIME,
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      width: 'calc(100% - 8px)',
      height: 'calc(100% - 8px)',
      border: '1px dashed white',
      borderRadius: '90px',
    },

    '&:hover::after': {
      opacity: '1',
    },

    [`&.${buttonClasses.disabled}`]: {
      opacity: 0.5,
      background: theme.themeColors.colorButtonNeutralBackgroundHover,
      color: theme.themeColors.colorButtonNeutralTextDefault,
      '&::before': {
        opacity: '0',
      },
    },

    '&.danger': {
      background: COLOR_PRIMARY_3,
      '&::before': {
        display: 'none',
      },
      '&::after': {
        background: COLOR_PRIMARY_3,
        filter: 'brightness(0.9)',
      },
    },
  },
  outlined: {
    border: `2px solid ${theme.themeColors.colorButtonBorderDefault}`,
    backgroundColor: theme.themeColors.colorButtonBackgroundDefault,
    color: theme.themeColors.colorButtonTextOutlined,

    '&:hover': {
      border: `2px solid transparent`,
      boxShadow: 'none',
      backgroundColor: theme.themeColors.colorButtonBackgroundHover,
      color: theme.themeColors.colorButtonTextHover,
    },

    [`&.${buttonClasses.disabled}`]: {
      border: `2px solid ${COLOR_NEUTRALS_4}`,
      backgroundColor: 'transparent',
      color: theme.themeColors.colorButtonBackgroundDisabled,
    },
  },
  outlinedSecondary: {
    border: 'none',
    color: theme.themeColors.colorButtonTextHover,
    background: theme.themeColors.colorButtonBackgroundHover,

    '&:hover': {
      border: 'none',
      boxShadow: 'none',
      color: theme.themeColors.colorButtonTextDefault,
      background: theme.themeColors.colorButtonBackgroundDefault,
    },

    [`&.${buttonClasses.disabled}`]: {
      opacity: 0.5,
      backgroundColor: theme.themeColors.colorButtonBackgroundDefault,
      color: theme.themeColors.colorButtonTextDefault,
    },
  },

  containedSecondary: {
    border: `1px solid transparent`,
    color: theme.themeColors.colorButtonSecondaryText,
    background: `${theme.themeColors.colorButtonSecondary} !important`,

    '&::before': {
      content: 'none',
    },
    '&::after': {
      background: `${theme.themeColors.colorButtonSecondary} !important`,
      transition: 'none',
    },

    '&:hover': {
      background: `${theme.themeColors.colorButtonSecondaryHover} !important`,
      border: `1px solid ${theme.themeColors.colorButtonSecondaryBorderHover}`,
      color: theme.themeColors.colorButtonSecondaryTextHover,

      '&::after': {
        background: `${theme.themeColors.colorButtonSecondaryHover} !important`,
      },
    },
  },

  text: {
    '&.withoutHover': {
      '&:hover': {
        background: 'inherit',
      },
    },
  },
});

export const getMuiButtonDefaultProps = (): ComponentsProps['MuiButton'] => ({
  disableElevation: false,
  disableFocusRipple: true,
  disableRipple: true,
  variant: 'contained',
  size: 'medium',
});
