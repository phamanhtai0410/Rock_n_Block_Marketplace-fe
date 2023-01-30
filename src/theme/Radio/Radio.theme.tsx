import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_PRIMARY_1, COLOR_WHITE_BASE } from 'theme/colors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiRadio = (theme: Theme): ComponentsOverrides['MuiCheckbox'] => {
  const colorCommon = {
    background: theme.themeColors.colorRadioAndCheckboxBackground,
    color: theme.themeColors.colorRadioAndCheckboxBackground,
    border: `2px solid ${theme.themeColors.colorRadioAndCheckboxBorder}`,
    '&:hover': {
      color: theme.themeColors.colorRadioAndCheckboxBackground,
      background: theme.themeColors.colorRadioAndCheckboxBackground,
      borderColor: theme.themeColors.colorRadioAndCheckboxBorderHover,
    },
    '&.Mui-checked': {
      background: COLOR_WHITE_BASE,
      color: COLOR_WHITE_BASE,
      border: `6px solid ${COLOR_PRIMARY_1}`,
    },
  };
  return {
    root: {
      padding: 0,
      height: 24,
      width: 24,
      borderRadius: '50%',
      borderWidth: 2,
      borderStyle: 'solid',
      overflow: 'hidden',
      '&.Mui-disabled': {
        color: 'transparent',
      },
    },
    colorPrimary: colorCommon,
    colorSecondary: colorCommon,
  };
};

export const getMuiRadioDefaultProps = (): ComponentsProps['MuiCheckbox'] => ({
  color: 'primary',
});
