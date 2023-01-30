import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_NEUTRALS_4, COLOR_PRIMARY_3, COLOR_PRIMARY_4, COLOR_SECONDARY_3 } from 'theme/colors';

export const getMuiCssBaselineOverrides = (theme: Theme): ComponentsOverrides['MuiCssBaseline'] => ({
  '*::-webkit-scrollbar': {
    width: 6,
    height: '100%',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: theme.themeColors.colorScrollbarBackground,
    borderRadius: 20,
  },
  html: {
    WebkitFontSmoothing: 'antialiased', // Antialiasing.
    MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    boxSizing: 'border-box',
  },
  body: {
    overflowX: 'hidden',
    margin: theme.spacing(0),
    overflowY: 'overlay',
    backgroundColor: theme.themeColors.colorBackground,
  },

  '.Toastify__toast': {
    minHeight: '56px !important',
    border: '1px solid !important',
    borderRadius: '12px !important',
    fontWeight: '400 !important',
    wordBreak: 'break-word',
    marginBottom: 0,
    backgroundColor: theme.themeColors.colorToast,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1.25),
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1),
    },

    svg: {
      width: '22px !important',
    },

    '&-body': {
      padding: '0 !important',
    },
    '&-icon': {
      width: 'fit-content !important',
    },

    '&--success': {
      borderColor: `${COLOR_PRIMARY_4} !important`,
      color: `${COLOR_PRIMARY_4} !important`,

      '.Toastify__toast-icon svg': {
        fill: COLOR_PRIMARY_4,
      },
      '.Toastify__close-button': {
        color: `${COLOR_PRIMARY_4} !important`,
      },
    },
    '&--info': {
      borderColor: `${COLOR_NEUTRALS_4} !important`,
      color: `${COLOR_NEUTRALS_4} !important`,

      '.Toastify__toast-icon svg': {
        fill: COLOR_NEUTRALS_4,
      },
      '.Toastify__close-button': {
        color: `${COLOR_NEUTRALS_4} !important`,
      },
    },
    '&--warning': {
      borderColor: `${COLOR_SECONDARY_3} !important`,
      color: `${COLOR_SECONDARY_3} !important`,

      '.Toastify__toast-icon svg': {
        fill: COLOR_SECONDARY_3,
      },
      '.Toastify__close-button': {
        color: `${COLOR_SECONDARY_3} !important`,
      },
    },
    '&--error': {
      borderColor: `${COLOR_PRIMARY_3} !important`,
      color: `${COLOR_PRIMARY_3} !important`,

      '.Toastify__toast-icon svg': {
        fill: COLOR_PRIMARY_3,
      },
      '.Toastify__close-button': {
        color: `${COLOR_PRIMARY_3} !important`,
      },
    },
    '&--default': {
      borderColor: 'rgba(94, 153, 245, 1) !important',
      color: 'rgba(94, 153, 245, 1) !important',

      '.Toastify__close-button': {
        color: 'rgba(94, 153, 245, 1) !important',
      },
    },
  },

  '.Toastify__close-button': {
    alignSelf: 'center !important',
    width: '25px !important',
    height: '25px !important',
    opacity: 1,
  },
});

export const getMuiCssBaselineDefaultProps = (): ComponentsProps['MuiCssBaseline'] => ({});
