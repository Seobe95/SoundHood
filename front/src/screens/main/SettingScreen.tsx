import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import {
  ColorsType,
  mainTabNavigations,
  myPageStackNavigations,
  rootStackNavigations,
  settingStackNavigations,
} from '@/constants';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/navigators/tab/TabNavigator.tsx';
import { AuthContext } from '@/context/AuthContext.tsx';
import NavigationListItem from '@/components/mypage/NavigationListItem';
import Container from '@/components/common/Container';

type MyPageScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.SETTING>,
  StackScreenProps<RootStackParamList, typeof rootStackNavigations.SETTING>
>;

type SettingNavigationType =
  (typeof settingStackNavigations)[keyof typeof settingStackNavigations];

export type MyPageNavigationType =
  (typeof myPageStackNavigations)[keyof typeof myPageStackNavigations];

export type NavigationListType<T, U = undefined> = {
  screen?: T | U;
  icon: string;
  title: string;
  url?: string;
};

const settingScreenDatas: NavigationListType<
  MyPageNavigationType,
  SettingNavigationType
>[] = [
  {
    screen: myPageStackNavigations.MY_PAGE_HOME,
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

function SettingScreen({ navigation }: MyPageScreenProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { isLogin } = useContext(AuthContext);

  function handleNavigateButton(
    screenName: SettingNavigationType | MyPageNavigationType,
  ) {
    if (screenName === 'MyPageHome' && !isLogin) {
      navigation.navigate(rootStackNavigations.AUTH, {
        screen: 'AuthHome',
      });
      return;
    }

    if (screenName === myPageStackNavigations.MY_PAGE_HOME) {
      navigation.navigate(rootStackNavigations.MYPAGE, {
        screen: myPageStackNavigations.MY_PAGE_HOME,
      });
    } else {
      navigation.navigate(rootStackNavigations.SETTING, {
        screen: screenName as SettingNavigationType,
      });
    }
  }

  return (
    <Container>
      <FlatList
        style={styles.listContainer}
        data={settingScreenDatas}
        renderItem={data => {
          const { item } = data;
          return (
            <NavigationListItem
              title={item.title}
              icon={item.icon}
              key={`${item.screen}${item.title}`}
              onPress={() => handleNavigateButton(item.screen!)}
            />
          );
        }}
      />
    </Container>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    listContainer: {
      height: '100%',
    },
  });

export default SettingScreen;
