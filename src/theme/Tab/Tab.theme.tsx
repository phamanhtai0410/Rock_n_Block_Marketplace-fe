import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_NEUTRALS_3, COLOR_NEUTRALS_4, COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';

export const getMuiTabsOverrides = (theme: Theme): ComponentsOverrides['MuiTabs'] => ({
  indicator: {
    display: 'none',
  },
  root: {
    position: 'relative',
    '&.scrollable': {
      paddingBottom: 40,
    },
    '&.outlined': {
      '.MuiTab-root': {
        opacity: 1,
        backgroundColor: theme.themeColors.colorTabOutlinedBackground,
        borderRadius: '8px',
        border: '2px solid transparent',
        padding: theme.spacing(2),
        height: 'auto',

        '&:hover': {},

        '&.Mui-selected': {
          border: `2px solid ${COLOR_PRIMARY_1}`,
        },

        '&.sm': {
          paddingBottom: theme.spacing(1.5),
          paddingTop: theme.spacing(1.5),
        },
      },
    },
  },
  scrollButtons: {
    display: 'block',
  },
});

export const getMuiTabOverrides = (theme: Theme): ComponentsOverrides['MuiTab'] => ({
  root: {
    color: COLOR_NEUTRALS_4,
    textTransform: 'capitalize',
    fontWeight: FontWeights.fontWeightBold,
    border: '2px solid transparent',
    borderRadius: theme.spacing(3),
    minHeight: 0,
    height: 28,

    '&:hover': {
      backgroundColor: 'transparent',
      border: `2px solid ${COLOR_NEUTRALS_3}`,
      transition: '500ms',
    },

    '&.Mui-selected': {
      backgroundColor: theme.themeColors.colorTabBackground,
      color: theme.themeColors.colorTabOutlinedTextActive,
    },

    '& .MuiTabScrollButton-root': {
      background: 'red',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no MuiTabScrollButton type at ComponentsOverrides :-(
export const getMuiTabButtonOverrides = (theme: Theme): ComponentsOverrides['MuiTabScrollButton'] => ({
  root: {
    position: 'absolute',
    right: 0,
    color: COLOR_NEUTRALS_4,
    bottom: 0,
    '&:first-of-type': {
      right: 40,
    },
  },
});

export const getMuiTabsDefaultProps = (): ComponentsProps['MuiTabs'] => ({
  // ScrollButtonComponent: ArrowBack,
});
