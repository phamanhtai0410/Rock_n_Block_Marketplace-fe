import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { Checkbox as CheckboxIcon } from 'components/Icon/components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiCheckbox = (theme: Theme): ComponentsOverrides['MuiCheckbox'] => {
  const colorCommon = {
    background: theme.themeColors.colorRadioAndCheckboxBackground,
    border: `2px solid ${theme.themeColors.colorRadioAndCheckboxBorder}`,
    color: 'transparent',
    '&:hover': {
      borderColor: theme.themeColors.colorRadioAndCheckboxBorderHover,
      background: theme.themeColors.colorRadioAndCheckboxBackground,
    },
    '&, &:hover, &:focus, &:active': {
      opacity: 1,
    },
    '&.Mui-checked': {
      border: 0,
      background: theme.themeColors.colorRadioAndCheckboxBackground,
      '&:hover': {
        background: theme.themeColors.colorRadioAndCheckboxBackground,
      },
    },
  };
  return {
    root: {
      marginLeft: 0,
      padding: 0,
      height: 24,
      width: 24,
      borderRadius: 4,
      borderWidth: 2,
      borderStyle: 'solid',
      overflow: 'hidden',
    },
    colorPrimary: colorCommon,
    colorSecondary: colorCommon,
  };
};

export const getMuiCheckboxDefaultProps = (): ComponentsProps['MuiCheckbox'] => ({
  checkedIcon: <CheckboxIcon />,
  color: 'primary',
});
