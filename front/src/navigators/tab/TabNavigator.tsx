/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {
  mainTabNavigations,
  postStackNavigations,
  rootStackNavigations,
} from '@/constants';
import ListScreen from '@/screens/main/ListScreen';
import MyPageScreen from '@/screens/main/MyPageScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReactNode, useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from '@/screens/main/MapScreen';
import { RootStackParamList } from '../root/RootNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import HeaderRightButton from '@/components/common/HeaderRightButton';
import { ThemeContext } from '@/context/CustomThemeContext';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { RFValue } from '@/utils';

export type MainTabParamList = {
  [mainTabNavigations.MAP]: undefined;
  [mainTabNavigations.LIST]: undefined;
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
): ReactNode | undefined => {
  const { focused, color, size } = props;
  let tintColor;
  let iconName;

  switch (routeName) {
    case mainTabNavigations.MAP:
      iconName = focused ? 'map' : 'map-outline';
      tintColor = focused ? color : '#8E8E8F';
      break;
    case mainTabNavigations.LIST:
      iconName = focused ? 'newspaper' : 'newspaper-outline';
      tintColor = focused ? color : '#8E8E8F';
      break;
    case mainTabNavigations.MY_PAGE:
      iconName = focused ? 'person-circle' : 'person-circle-outline';
      tintColor = focused ? color : '#8E8E8F';
      break;
  }
  // react/react-in-jsx-scope
  return <Icon name={iconName} size={size} color={tintColor} />;
};

function TabNavigator({ navigation }: TabNavigatorProps) {
  const themeColor = useContext(ThemeContext);
  return (
    <MainTab.Navigator
      initialRouteName={mainTabNavigations.MAP}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: themeColor.backgroundColor,
        },
        tabBarIconStyle: {
          color: themeColor.BLUE_300,
        },
        tabBarIcon: props =>
          handleTabbarIcon(route.name, {
            ...props,
          }),
        headerShown: true,
        headerRightContainerStyle: {
          paddingRight: 8,
        },
        headerStyle: {
          backgroundColor: themeColor.backgroundColor,
        },
        headerTitleStyle: {
          color: themeColor.fontColorPrimary,
        },
        headerRight: () => (
          <HeaderRightButton
            icon={
              <Icon
                name="musical-notes-outline"
                size={25}
                color={themeColor.fontColorPrimary}
              />
            }
            onPress={() =>
              navigation.navigate('PostNavigator', {
                screen: 'Post',
              })
            }
          />
        ),
      })}>
      <MainTab.Screen
        name={mainTabNavigations.MAP}
        component={MapScreen}
        options={{
          headerTitle: 'Sound Hood',
        }}
      />
      {/* <MainTab.Screen name={mainTabNavigations.LIST} component={ListScreen} /> */}
      <MainTab.Screen
        name={mainTabNavigations.MY_PAGE}
        component={MyPageScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default TabNavigator;
