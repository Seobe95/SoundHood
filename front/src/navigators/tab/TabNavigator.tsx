/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {
  ColorsType,
  mainTabNavigations,
  rootStackNavigations,
} from '@/constants';
import MyPageScreen from '@/screens/main/MyPageScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReactNode, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from '@/screens/main/MapScreen';
import { RootStackParamList } from '../root/RootNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '@/context/CustomThemeContext';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Text } from 'react-native';
import LikeScreen from '@/screens/main/LikeScreen';

export type MainTabParamList = {
  [mainTabNavigations.MAP]: {
    latitude?: number;
    longitude?: number;
    addressName?: string;
  };
  [mainTabNavigations.LIKE]: undefined;
  [mainTabNavigations.MY_PAGE]: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

type TabNavigatorProps = StackScreenProps<
  RootStackParamList,
  typeof rootStackNavigations.MAIN_TAP
>;

const handleTabbarIcon = (
  routeName: (typeof mainTabNavigations)[keyof typeof mainTabNavigations],
  props: {
    focused: boolean;
    color: string;
    size: number;
  },
  iconColor: ColorsType,
): ReactNode | undefined => {
  const { focused, color, size } = props;
  let tintColor;
  let iconName;

  switch (routeName) {
    case mainTabNavigations.MAP:
      iconName = focused ? 'map' : 'map-outline';
      tintColor = focused ? iconColor.BLUE_400 : color;
      break;
    case mainTabNavigations.LIKE:
      iconName = focused ? 'heart' : 'heart-outline';
      tintColor = focused ? iconColor.BLUE_400 : color;
      break;
    case mainTabNavigations.MY_PAGE:
      iconName = focused ? 'settings' : 'settings-outline';
      tintColor = focused ? iconColor.BLUE_400 : color;
      break;
  }
  // react/react-in-jsx-scope
  return <Icon name={iconName} size={size} color={tintColor} />;
};

const handleTabbarText = (
  routeName: (typeof mainTabNavigations)[keyof typeof mainTabNavigations],
  props: {
    focused: boolean;
    color: string;
    position: LabelPosition;
    children: string;
  },
  iconColor: ColorsType,
): ReactNode | undefined => {
  const { focused, color, children } = props;
  let tintColor;

  switch (routeName) {
    case mainTabNavigations.MAP:
      tintColor = focused ? iconColor.BLUE_400 : color;
      break;
    case mainTabNavigations.LIKE:
      tintColor = focused ? iconColor.BLUE_400 : color;
      break;
    case mainTabNavigations.MY_PAGE:
      tintColor = focused ? iconColor.BLUE_400 : color;
      break;
  }
  // react/react-in-jsx-scope
  return <Text style={{ color: tintColor, fontSize: 10 }}>{children}</Text>;
};

function TabNavigator({}: TabNavigatorProps) {
  const themeColor = useContext(ThemeContext);
  return (
    <MainTab.Navigator
      initialRouteName={mainTabNavigations.MAP}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: themeColor.backgroundColor,
          borderTopWidth: 0,
          shadowOpacity: 0.15,
        },
        tabBarShowLabel: false,
        tabBarIcon: props => handleTabbarIcon(route.name, props, themeColor),
        tabBarLabel: props => handleTabbarText(route.name, props, themeColor),
        headerShown: true,
        headerStyle: {
          backgroundColor: themeColor.backgroundColor,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: themeColor.fontColorPrimary,
        },
      })}>
      <MainTab.Screen
        name={mainTabNavigations.MAP}
        component={MapScreen}
        options={{
          headerShown: false,
          title: '지도',
        }}
      />
      <MainTab.Screen
        name={mainTabNavigations.LIKE}
        component={LikeScreen}
        options={{
          headerShown: true,
          title: '좋아요',
        }}
      />
      <MainTab.Screen
        name={mainTabNavigations.MY_PAGE}
        component={MyPageScreen}
        options={{
          title: '설정',
        }}
      />
    </MainTab.Navigator>
  );
}

export default TabNavigator;
