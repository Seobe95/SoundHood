import React, { createContext } from 'react';
import {
  Platform,
  StatusBar,
  StatusBarStyle,
  useColorScheme,
} from 'react-native';
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
    <ThemeContext.Provider value={themeColor}>
      <StatusBar
        animated={true}
        barStyle={deviceTheme === 'light' ? 'dark-content' : 'light-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, CustomThemeProvider };
