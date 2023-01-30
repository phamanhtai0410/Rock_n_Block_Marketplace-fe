import React, { useCallback, useState } from 'react';
import { addDecorator } from '@storybook/react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { getTheme } from '../src/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/configureStore';
import '../src/styles/index.scss';
import { colorThemes } from '../src/theme/colors/colorTheme';

const MUIDecorator = (story) => {
  const [selectedTheme, setSelectedTheme] = useState(store.store.getState().user.theme);

  const handleToggleTheme = useCallback(() => {
    store.store.dispatch({ type: 'user/toggleTheme' });
    setSelectedTheme(store.store.getState().user.theme);
  }, []);

  return (
    <Provider store={store.store}>
      <ThemeProvider theme={getTheme(colorThemes[selectedTheme])}>
        <Box
          sx={{
            background: selectedTheme === 'light' ? '#FCFCFD' : '#070A25',
            height: '100%',
            minHeight: '100vh',
          }}
        >
          <BrowserRouter>
            <CssBaseline />
            <button style={{ zIndex: 100000, position: 'relative' }} onClick={() => handleToggleTheme()}>Toggle theme</button>
            <Box
              sx={{
                border: '1px solid yellow',
              }}
            >
              {story()}
            </Box>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

addDecorator(MUIDecorator);

export const parameters = { layout: 'fullscreen' };
