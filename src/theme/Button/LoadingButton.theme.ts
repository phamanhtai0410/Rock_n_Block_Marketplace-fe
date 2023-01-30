import { ComponentsOverrides, ComponentsProps } from '@mui/material';

export const getMuiLoadingButtonOverrides = (): ComponentsOverrides['MuiLoadingButton'] => ({
  root: {},
});

export const getMuiLoadingButtonDefaultProps = (): ComponentsProps['MuiLoadingButton'] => ({
  loading: true,
});
