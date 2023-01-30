import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiFormControlLabelOverrides = (theme?: Theme): ComponentsOverrides['MuiFormControlLabel'] => ({
  root: {
    marginLeft: 0,
  },
  label: {
    marginLeft: '12px',
  },
});

export const getMuiFormControlLabelDefaultProps = (): ComponentsProps['MuiFormControlLabel'] => ({});
