import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import {
  ColorsType,
  mainTabNavigations,
  rootStackNavigations,
  settingStackNavigations,
} from '@/constants';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/navigators/tab/TabNavigator.tsx';
import { AuthContext } from '@/context/AuthContext.tsx';
import CustomButton from '@/components/common/CustomButton';
import useAuth from '@/hooks/queries/useAuth';
import SettingListItem from '@/components/mypage/SettingListItem';

type MyPageScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.MY_PAGE>,
  StackScreenProps<RootStackParamList, typeof rootStackNavigations.SETTING>
>;

type SettingNavigationType =
  (typeof settingStackNavigations)[keyof typeof settingStackNavigations];

type SettingScreenType = {
  screen: SettingNavigationType;
  icon: string;
  title: string;
  url?: string;
};

const settingScreenDatas: SettingScreenType[] = [
  {
    screen: settingStackNavigations.NICKNAME_CHANGE,
    icon: 'person-circle-outline',
    title: '내 프로필',
  },
  {
    screen: settingStackNavigations.USE_TERMS_INFORMATION,
    icon: 'document-text-outline',
    title: '이용약관',
  },
  {
    screen: settingStackNavigations.PERSONAL_INFORMATION,
    icon: 'information-circle-outline',
    title: '개인정보처리방침',
  },
  {
    screen: settingStackNavigations.OPEN_SOURCE_INFORMAION,
    icon: 'code-slash-outline',
    title: '오픈소스 라이센스',
  },
];

function MyPageScreen({ navigation }: MyPageScreenProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { isLogin, logout, userInfo } = useContext(AuthContext);
  const { logoutMutation } = useAuth();
  function handleNavigateButton(
    screenName: SettingNavigationType,
    url?: string,
  ) {
    if (screenName === 'NicknameChange' && !isLogin) {
      console.log(userInfo);
      navigation.navigate('AuthNavigator', {
        screen: 'AuthHome',
      });
    } else {
      navigation.navigate('Setting', {
        screen: screenName,
      });
    }
  }

  function handleLogoutButton() {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          logout();
        },
      },
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={settingScreenDatas}
        renderItem={data => {
          const { item } = data;

          return (
            <SettingListItem
              title={item.title}
              icon={item.icon}
              key={`${item.screen}${item.title}`}
              onPress={() => handleNavigateButton(item.screen)}
            />
          );
        }}
      />
      {isLogin && (
        <View style={styles.buttonContainer}>
          <CustomButton label="로그아웃" onPress={handleLogoutButton} />
        </View>
      )}
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      height: '100%',
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: 20,
    },
    buttonContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
  });

export default MyPageScreen;
