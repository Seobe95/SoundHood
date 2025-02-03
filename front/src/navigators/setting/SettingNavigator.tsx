import { createStackNavigator } from '@react-navigation/stack';
import { settingStackNavigations } from '@/constants';
import OpenSourceInformationScreen from '@/screens/setting/OpenSourceInformationScreen';
import PersonalInformationScreen from '@/screens/setting/PersonalInformationScreen';
import UseTermsInformationScreen from '@/screens/setting/UseTermsInformationScreen';
import { useContext } from 'react';
import { ThemeContext } from '@/context/CustomThemeContext';
import HeaderLeftButton from '@/components/common/HeaderLeftButton';
import { Platform } from 'react-native';

export type SettingStackParamList = {
  [settingStackNavigations.OPEN_SOURCE_INFORMAION]: undefined;
  [settingStackNavigations.PERSONAL_INFORMATION]: undefined;
  [settingStackNavigations.USE_TERMS_INFORMATION]: undefined;
};
const SettingStackNavigator = createStackNavigator<SettingStackParamList>();

interface SettingNavigatorProps {}

function headerTitleHandler(title: string) {
  switch (title) {
    case settingStackNavigations.OPEN_SOURCE_INFORMAION:
      return '오픈소스 라이센스';
    case settingStackNavigations.USE_TERMS_INFORMATION:
      return '이용약관';
    case settingStackNavigations.PERSONAL_INFORMATION:
      return '개인정보 처리방침';
    default:
      return '마이페이지';
  }
}

function SettingNavigator({}: SettingNavigatorProps) {
  const theme = useContext(ThemeContext);
  const isAndroid = Platform.OS === 'android';
  return (
    <SettingStackNavigator.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerBackTitle: '이전',
        headerStyle: {
          backgroundColor: theme.backgroundColor,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: { color: theme.fontColorPrimary },
        headerTitle: headerTitleHandler(route.name),
        headerLeft: isAndroid
          ? props => {
              return (
                <HeaderLeftButton
                  {...props}
                  tintColor={theme.fontColorPrimary}
                />
              );
            }
          : undefined,
      })}>
      <SettingStackNavigator.Screen
        name={settingStackNavigations.OPEN_SOURCE_INFORMAION}
        component={OpenSourceInformationScreen}
      />
      <SettingStackNavigator.Screen
        name={settingStackNavigations.PERSONAL_INFORMATION}
        component={PersonalInformationScreen}
      />
      <SettingStackNavigator.Screen
        name={settingStackNavigations.USE_TERMS_INFORMATION}
        component={UseTermsInformationScreen}
      />
    </SettingStackNavigator.Navigator>
  );
}

export default SettingNavigator;
