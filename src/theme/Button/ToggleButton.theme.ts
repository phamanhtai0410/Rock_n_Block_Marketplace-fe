import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_BLACK, COLOR_GREEN } from 'theme/colors';
import { BORDER_MAIN, BORDER_RADIUS_BUTTON } from 'theme/variables';

export const getMuiToggleButtonOverrides = (theme: Theme): ComponentsOverrides['MuiToggleButton'] => ({
  root: {
    margin: `${theme.spacing(0.5)} !important`,
    height: '44px',
    minWidth: '155px',
    background: 'transparent',
    border: BORDER_MAIN,
    borderRadius: BORDER_RADIUS_BUTTON,
    color: COLOR_BLACK,
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('md')]: {
      minWidth: 'auto',
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 'auto',
      width: '100%',
    },

    '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
      borderRadius: BORDER_RADIUS_BUTTON,
      border: BORDER_MAIN,
    },
    '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
      borderRadius: BORDER_RADIUS_BUTTON,
      border: BORDER_MAIN,
    },

    '&.MuiToggleButton-root.Mui-selected': {
      background: COLOR_GREEN,
      border: 'none',
      borderRadius: BORDER_RADIUS_BUTTON,
      color: COLOR_BLACK,
    },
  },
});

export const getMuiToggleButtonDefaultProps = (): ComponentsProps['MuiToggleButton'] => ({});
