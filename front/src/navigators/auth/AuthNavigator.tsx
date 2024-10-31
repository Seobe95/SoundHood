import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import { authNavigations } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';

interface AuthNavigationProps {}

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.REGISTER]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator({}: AuthNavigationProps) {
  const themeColor = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName={authNavigations.AUTH_HOME}
      screenOptions={{
        cardStyle: {
          backgroundColor: themeColor.backgroundColor,
        },
        headerStyle: {
          backgroundColor: themeColor.backgroundColorSecondary,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '이메일 로그인',
          headerBackTitle: '로그인',
          headerTitleStyle: {
            color: themeColor.fontColorPrimary,
          },
        }}
        name={authNavigations.LOGIN}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '이메일 회원가입',
          headerBackTitle: '로그인',
          headerTitleStyle: {
            color: themeColor.fontColorPrimary,
          },
        }}
        name={authNavigations.REGISTER}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthNavigator;
