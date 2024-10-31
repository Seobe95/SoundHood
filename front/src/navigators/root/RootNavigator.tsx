import React from 'react';
import { StyleSheet } from 'react-native';
import AuthNavigator, { AuthStackParamList } from '../auth/AuthNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator, { MainTabParamList } from '../tab/TabNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import DetailNavigator, {
  DetailStackParamList,
} from '../detail/DetailNavigator';
import PostScreen from '@/screens/post/PostScreen';
import { rootStackNavigations } from '@/constants';

export type RootStackParamList = {
  [rootStackNavigations.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [rootStackNavigations.MAIN_TAP]: NavigatorScreenParams<MainTabParamList>;
  [rootStackNavigations.DETAIL]: NavigatorScreenParams<DetailStackParamList>;
  [rootStackNavigations.POST]: undefined;
  [rootStackNavigations.SETTING]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name={rootStackNavigations.MAIN_TAP}
        component={TabNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigations.AUTH}
        component={AuthNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigations.POST}
        component={PostScreen}
      />
      <RootStack.Screen
        name={rootStackNavigations.DETAIL}
        component={DetailNavigator}
      />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default RootNavigator;
