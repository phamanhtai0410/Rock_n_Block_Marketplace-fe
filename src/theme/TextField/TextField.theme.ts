import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { BORDER_RADIUS_MEDIUM } from 'theme/variables';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiTextFieldOverrides = (theme?: Theme): ComponentsOverrides['MuiTextField'] => ({
  root: {
    boxShadow: 'none',
    borderRadius: BORDER_RADIUS_MEDIUM,
    fontSize: '16px',
    '&.success .MuiOutlinedInput-root fieldset': {
      borderColor: theme?.themeColors.colorTextFieldBorderSuccess,
    },
    '& input::placeholder': {
      opacity: 1,
      color: theme?.themeColors.colorTextFieldPlaceholderDefault,
      fontWeight: FontWeights.fontWeightRegular,
    },
    '& .MuiInputBase-input': {
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': {
      overflow: 'hidden',
      borderRadius: BORDER_RADIUS_MEDIUM,
      color: theme?.themeColors.colorTextFieldColor,
      background: theme?.themeColors.colorTextFieldBackground,
      caretColor: theme?.themeColors.colorTextFieldCaretColor,

      '&.Mui-error': {
        color: theme?.themeColors.colorTextFieldColorError,
      },

      '& fieldset': {
        transition: '350ms ease-in-out',
        border: '2px solid',
        borderColor: theme?.themeColors.colorTextFieldBorderDefault,
      },
      '&:hover fieldset': {
        borderColor: theme?.themeColors.colorTextFieldBorderHover,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme?.themeColors.colorTextFieldBorderFocusBold,
      },
    },
    '& .MuiOutlinedInput-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
      },

      '&.Mui-disabled': {
        WebkitTextFillColor: COLOR_NEUTRALS_4,

        '& + fieldset': {
          borderColor: theme?.themeColors.colorTextFieldBorderDefault,
        },
      },
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgba(26, 26, 26, 0.2)',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: 'rgba(26, 26, 26, 0.2)',
    },
    '& .MuiFormHelperText-root': {
      fontSize: '16px',
      marginLeft: 0,
    },
  },
});

export const getMuiTextFieldDefaultProps = (): ComponentsProps['MuiTextField'] => ({
  SelectProps: {
    displayEmpty: true,
  },
  InputProps: {
    style: {
      minHeight: '48px',
    },
    autoComplete: 'off',
  },
});

// Styles for filled input
export const getMuiFilledInputOverrides = (theme?: Theme): ComponentsOverrides['MuiFilledInput'] => ({
  root: {
    color: theme?.themeColors.colorTextFieldColor,
    backgroundColor: 'transparent',
    borderBottomColor: 'red',
    'caret-color': theme?.themeColors.colorTextFieldCaretColor,

    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:before': {
      borderBottomColor: theme?.themeColors.colorTextFieldPlaceholderDefault,
    },
  },
});

export const getMuiFilledInputDefaultProps = (): ComponentsProps['MuiFilledInput'] => ({});
