import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from './src/context/CustomThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from '@/navigators/root/RootNavigator';
import { queryClient } from '@/api';
import { AuthProvider } from '@/context/AuthContext.tsx';
import { ToastProvider } from '@/context/ToastContext.tsx';
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <CustomThemeProvider>
            <NavigationContainer>
              <ToastProvider>
                <RootNavigator />
              </ToastProvider>
            </NavigationContainer>
          </CustomThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
