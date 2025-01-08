import { createStackNavigator } from '@react-navigation/stack';
import { settingStackNavigations } from '@/constants';
import NicknameChangeScreen from '@/screens/setting/NicknameChangeScreen';
import OpenSourceInformationScreen from '@/screens/setting/OpenSourceInformationScreen';
import PersonalInformationScreen from '@/screens/setting/PersonalInformationScreen';
import UseTermsInformationScreen from '@/screens/setting/UseTermsInformationScreen';

export type SettingStackParamList = {
  [settingStackNavigations.SETTING]: undefined;
  [settingStackNavigations.NICKNAME_CHANGE]: undefined;
  [settingStackNavigations.OPEN_SOURCE_INFORMAION]: undefined;
  [settingStackNavigations.PERSONAL_INFORMATION]: undefined;
  [settingStackNavigations.USE_TERMS_INFORMATION]: undefined;
};
const SettingStackNavigator = createStackNavigator<SettingStackParamList>();

interface SettingNavigatorProps {}

function SettingNavigator({}: SettingNavigatorProps) {
  return (
    <SettingStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
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
