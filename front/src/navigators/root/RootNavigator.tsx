import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import AuthNavigator, { AuthStackParamList } from '../auth/AuthNavigator';
import TabNavigator, { MainTabParamList } from '../tab/TabNavigator';
import PostNavigator, { PostStackParamList } from '../post/PostNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import DetailNavigator, {
  DetailStackParamList,
} from '../detail/DetailNavigator';
import { rootStackNavigations } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import SettingNavigator, {
  SettingStackParamList,
} from '@/navigators/setting/SettingNavigator.tsx';
import MyPageNavigator, {
  MyPageStackParamList,
} from '../mypage/MyPageNavigator';

export type RootStackParamList = {
  [rootStackNavigations.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [rootStackNavigations.MAIN_TAP]: NavigatorScreenParams<MainTabParamList>;
  [rootStackNavigations.DETAIL]: NavigatorScreenParams<DetailStackParamList>;
  [rootStackNavigations.POST]: NavigatorScreenParams<PostStackParamList>;
  [rootStackNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
  [rootStackNavigations.MYPAGE]: NavigatorScreenParams<MyPageStackParamList>;
};

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const theme = useContext(ThemeContext);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.backgroundColor,
        },
      }}>
      <RootStack.Screen
        options={{
          animationTypeForReplace: 'pop',
        }}
        name={rootStackNavigations.MAIN_TAP}
        component={TabNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigations.AUTH}
        component={AuthNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigations.POST}
        component={PostNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigations.DETAIL}
        component={DetailNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigations.SETTING}
        component={SettingNavigator}
      />
      <RootStack.Screen
        name={rootStackNavigations.MYPAGE}
        component={MyPageNavigator}
      />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default RootNavigator;
