// declare const DEBUG: boolean;
import { StackProps, SystemStyleObject, Theme as MuiTheme } from '@mui/material';
import { colorThemes } from 'theme/colors/colorTheme';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

declare module '@mui/material' {
  interface Theme extends MuiTheme {
    themeColors: typeof colorThemes.light;
  }
}

declare module '@mui/material/Stack/Stack' {
  function style({
    ownerState,
    theme,
  }: {
    ownerState: { direction: StackProps['direction']; spacing: StackProps['spacing'] };
    theme: Theme;
  }): SystemStyleObject<Theme>;
}
