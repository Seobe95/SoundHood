import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AuthHomeScreen from '../screens/auth/AuthHomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {authNavigations} from '../constants';

interface AuthNavigationProps {}

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.REGISTER]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigation({}: AuthNavigationProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
      />
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={authNavigations.REGISTER}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthNavigation;
