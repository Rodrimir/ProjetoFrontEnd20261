import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';
import { MockDataProvider } from './contexts/MockDataContext';
import { useThemeToggle } from './contexts/ThemeToggleContext';
import AppRoutes from './routes';

const App = () => {
  const { isDark } = useThemeToggle();
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <MockDataProvider>
        <AppRoutes />
      </MockDataProvider>
    </ThemeProvider>
  );
};

export default App;