import { createStackNavigator } from '@react-navigation/stack';
import { settingStackNavigations } from '@/constants';
import NicknameChangeScreen from '@/screens/setting/NicknameChangeScreen';
import OpenSourceInformationScreen from '@/screens/setting/OpenSourceInformationScreen';
import PersonalInformationScreen from '@/screens/setting/PersonalInformationScreen';
import UseTermsInformationScreen from '@/screens/setting/UseTermsInformationScreen';
import { Text } from 'react-native';

export type SettingStackParamList = {
  [settingStackNavigations.SETTING]: undefined;
  [settingStackNavigations.NICKNAME_CHANGE]: undefined;
  [settingStackNavigations.OPEN_SOURCE_INFORMAION]: undefined;
  [settingStackNavigations.PERSONAL_INFORMATION]: undefined;
  [settingStackNavigations.USE_TERMS_INFORMATION]: undefined;
};
const SettingStackNavigator = createStackNavigator<SettingStackParamList>();

interface SettingNavigatorProps {}

function headerTitleHandler(title: string) {
  switch (title) {
    case settingStackNavigations.NICKNAME_CHANGE:
      return '닉네임 변경';
    case settingStackNavigations.OPEN_SOURCE_INFORMAION:
      return '오픈소스 라이센스';
    case settingStackNavigations.USE_TERMS_INFORMATION:
      return '이용약관';
    case settingStackNavigations.PERSONAL_INFORMATION:
      return '개인정보 처리방침';
  }
}

function SettingNavigator({}: SettingNavigatorProps) {
  return (
    <SettingStackNavigator.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: headerTitleHandler(route.name),
        headerBackTitle: '이전',
      })}>
      <SettingStackNavigator.Screen
        name={settingStackNavigations.NICKNAME_CHANGE}
        component={NicknameChangeScreen}
      />
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
