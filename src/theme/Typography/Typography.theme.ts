import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GREEN, COLOR_PRIMARY_1, COLOR_WHITE } from 'theme/colors';

export enum FontWeights {
  fontWeightLight = 300,
  fontWeightRegular = 400,
  fontWeightMedium = 500,
  fontWeightSemiBold = 600,
  fontWeightBold = 700,
}

export const colorVariations = {
  '&.white': {
    color: COLOR_WHITE,
  },
  '&.green': {
    color: COLOR_GREEN,
  },
  '&.black': {
    color: COLOR_BLACK,
  },
  '&.gray': {
    color: COLOR_GRAY,
  },
  '&.pink': {
    color: COLOR_PRIMARY_1,
  },
};

export const getTypographyOptions = (theme: Theme): ComponentsOverrides['MuiTypography'] => ({
  root: {
    textTransform: 'none',
    color: theme.themeColors.colorTextDefault,
    fontFamily: '"Poppins", sans-serif',
    fontWeight: FontWeights.fontWeightRegular,
    textAlign: 'left',
    fontStyle: 'normal',
    ...colorVariations,
  },

  h1: {
    fontSize: '64px',
    lineHeight: '64px',
    fontWeight: FontWeights.fontWeightBold,
  },

  h2: {
    fontSize: '48px',
    lineHeight: '56px',
    fontWeight: FontWeights.fontWeightBold,
  },

  h3: {
    fontSize: '40px',
    lineHeight: '48px',
    fontWeight: FontWeights.fontWeightSemiBold,
  },

  h4: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: FontWeights.fontWeightSemiBold,
  },

  h5: {
    fontSize: '23px',
    lineHeight: '29px',
    fontWeight: FontWeights.fontWeightRegular,
  },

  body1: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: FontWeights.fontWeightRegular,
    '&.xs': {
      fontSize: '12px',
      lineHeight: '20px',
    },
    '&.s': {
      fontSize: '14px',
      lineHeight: '24px',
    },
    '&.l': {
      fontSize: '20px',
      lineHeight: '25px',
    },
    '&.xl': {
      fontSize: '24px',
      lineHeight: '32px',
    },
    '&.xxl': {
      fontSize: '32px',
      lineHeight: '42px',
    },
  },

  body2: {
    fontSize: '16px',
    lineHeight: '26px',
    fontWeight: FontWeights.fontWeightMedium,
    color: theme.themeColors.colorTextBody2,
    '&.l': {
      fontSize: '18px',
      lineHeight: '26px',
    },
  },

  button: {
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: FontWeights.fontWeightBold,
    '&.s': {
      fontSize: '14px',
      lineHeight: '16px',
    },
  },
});

export const getMuiTextFieldDefaultProps = (): ComponentsProps['MuiTypography'] => ({
  variant: 'body1',
});
