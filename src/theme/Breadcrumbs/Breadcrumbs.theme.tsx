import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_NEUTRALS_5 } from 'theme/colors';

export const getMuiBreadcrumbsOverrides = (theme?: Theme): ComponentsOverrides['MuiBreadcrumbs'] => ({});

export const getMuiBreadcrumbsDefaultProps = (): ComponentsProps['MuiBreadcrumbs'] => ({
  separator: <NavigateNextIcon fontSize="small" sx={{ color: COLOR_NEUTRALS_5 }} />,
});
