import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { getTheme } from 'theme';
import { colorThemes } from 'theme/colors/colorTheme';

export const MuiThemeProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const currentTheme = useShallowSelector(userSelector.getProp('theme'));

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? getTheme(colorThemes.dark) : getTheme(colorThemes.light)}>
      {children}
    </ThemeProvider>
  );
};
