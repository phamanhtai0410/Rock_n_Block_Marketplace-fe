import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { SelectArrowDown } from 'components/Icon/components';

export const getMuiSelectOverrides = (theme: Theme): ComponentsOverrides['MuiSelect'] => ({
  filled: {
    background: 'transparent',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    top: '20%',
    right: '8px',
    width: '29px',
    height: '29px',
    padding: '7px',
    border: `1px solid ${theme.themeColors.colorSelectIconBorder}`,
    borderRadius: '50%',

    path: {
      fill: theme.themeColors.colorSelectIcon,
    },
  },
});

export const getMuiSelectDefaultProps = (): ComponentsProps['MuiSelect'] => ({
  IconComponent: SelectArrowDown,
});
