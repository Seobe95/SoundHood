import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from './src/context/CustomThemeContext';
import AuthNavigator from './src/navigators/auth/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <CustomThemeProvider>
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
        </CustomThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
