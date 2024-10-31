import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from './src/context/CustomThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootNavigator from '@/navigators/root/RootNavigator';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <CustomThemeProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </CustomThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
