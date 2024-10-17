import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/auth/LoginScreen';
import { CustomThemeProvider } from './src/context/CustomThemeContext';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <CustomThemeProvider>
          <LoginScreen />
        </CustomThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
