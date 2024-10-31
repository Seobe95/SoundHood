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
import { rootStackNavigator } from '@/constants';

export type RootStackParamList = {
  [rootStackNavigator.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [rootStackNavigator.MAIN_TAP]: NavigatorScreenParams<MainTabParamList>;
  [rootStackNavigator.DETAIL]: NavigatorScreenParams<DetailStackParamList>;
  [rootStackNavigator.POST]: undefined;
  [rootStackNavigator.SETTING]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name={rootStackNavigator.MAIN_TAP}
        component={TabNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigator.AUTH}
        component={AuthNavigator}
      />
      <RootStack.Screen name={rootStackNavigator.POST} component={PostScreen} />
      <RootStack.Screen
        name={rootStackNavigator.DETAIL}
        component={DetailNavigator}
      />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default RootNavigator;
