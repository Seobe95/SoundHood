import React, { createContext } from 'react';
import { useColorScheme } from 'react-native';
import { theme, ThemeType } from '../constants';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeType['light' | 'dark']>(theme.light);

function CustomThemeProvider({ children }: ThemeProviderProps) {
  const deviceTheme = useColorScheme();
  const makeThemeColor = (
    themeMode: 'dark' | 'light',
  ): ThemeType['light' | 'dark'] => {
    return themeMode === 'dark' ? theme.dark : theme.light;
  };
  const themeColor = makeThemeColor(deviceTheme ?? 'light');
  return (
    <ThemeContext.Provider value={themeColor}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext, CustomThemeProvider };
