/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { mainTabNavigations, rootStackNavigations } from '@/constants';
import ListScreen from '@/screens/main/ListScreen';
import MyPageScreen from '@/screens/main/MyPageScreen';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from '@/screens/main/MapScreen';
import { RootStackParamList } from '../root/RootNavigator';
import { StackScreenProps } from '@react-navigation/stack';

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
  let iconName;
  switch (routeName) {
    case mainTabNavigations.MAP:
      iconName = focused ? 'map' : 'map-outline';
      break;
    case mainTabNavigations.LIST:
      iconName = focused ? 'newspaper' : 'newspaper-outline';
      break;
    case mainTabNavigations.MY_PAGE:
      iconName = focused ? 'person-circle' : 'person-circle-outline';
      break;
  }
  // react/react-in-jsx-scope
  return <Icon name={iconName} size={size} color={color} />;
};

function TabNavigator({ navigation }: TabNavigatorProps) {
  return (
    <MainTab.Navigator
      initialRouteName={mainTabNavigations.MAP}
      screenOptions={({ route }) => ({
        tabBarIcon: props => handleTabbarIcon(route.name, props),
        headerShown: true,
        headerRight: () => {
          return (
            <Icon
              name={'musical-notes-outline'}
              size={30}
              onPress={() => {
                navigation.navigate('auth', {
                  screen: 'AuthHome',
                });
              }}
              style={{
                marginRight: 12,
              }}
            />
          );
        },
      })}>
      <MainTab.Screen name={mainTabNavigations.MAP} component={MapScreen} />
      <MainTab.Screen name={mainTabNavigations.LIST} component={ListScreen} />
      <MainTab.Screen
        name={mainTabNavigations.MY_PAGE}
        component={MyPageScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default TabNavigator;
