import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AuthRequiredScreen from '../auth/AuthRequiredScreen';
import Container from '@/components/common/Container';
import {
  authNavigations,
  myPageStackNavigations,
  rootStackNavigations,
} from '@/constants';
import {
  MyPageNavigationType,
  NavigationListType,
} from '../main/SettingScreen';
import NavigationListItem from '@/components/mypage/NavigationListItem';
import { RootStackParamList } from '@/navigators/root/RootNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { MyPageStackParamList } from '@/navigators/mypage/MyPageNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import useAuth from '@/hooks/queries/useAuth';

const myPageNavigationData: NavigationListType<MyPageNavigationType>[] = [
  {
    screen: myPageStackNavigations.MY_POST_PAGE,
    icon: 'newspaper-outline',
    title: '내가 작성한 글',
  },
  {
    screen: myPageStackNavigations.NICKNAME_CHANGE,
    icon: 'id-card-outline',
    title: '닉네임 변경',
  },
  {
    title: '로그아웃',
    icon: 'log-out-outline',
  },
  {
    title: '회원 탈퇴',
    icon: 'person-remove-outline',
  },
];

type MypageHomeProps = CompositeScreenProps<
  StackScreenProps<MyPageStackParamList>,
  StackScreenProps<RootStackParamList>
>;

function MypageHome({ navigation }: MypageHomeProps) {
  const { isLogin, logout } = useContext(AuthContext);
  const { logoutMutation } = useAuth();

  function handleNavigateButton(
    screen: MyPageNavigationType | undefined,
    title: string,
  ) {
    switch (screen) {
      case myPageStackNavigations.MY_POST_PAGE:
        navigation.navigate(rootStackNavigations.MYPAGE, {
          screen: myPageStackNavigations.MY_POST_PAGE,
        });
        break;
      case myPageStackNavigations.NICKNAME_CHANGE:
        navigation.navigate(rootStackNavigations.MYPAGE, {
          screen: myPageStackNavigations.NICKNAME_CHANGE,
        });
        break;
      default:
        title === '로그아웃' ? logoutHandler() : undefined;
    }
  }

  function logoutHandler() {
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
    <Container>
      {isLogin ? (
        <FlatList
          data={myPageNavigationData}
          renderItem={item => {
            const { icon, screen, title } = item.item;
            return (
              <NavigationListItem
                icon={icon}
                title={title}
                onPress={() => handleNavigateButton(screen, title)}
              />
            );
          }}
        />
      ) : (
        <AuthRequiredScreen
          handleNavigate={() =>
            navigation.navigate(rootStackNavigations.AUTH, {
              screen: authNavigations.AUTH_HOME,
            })
          }
          instruction="로그인이 필요합니다."
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({});

export default MypageHome;
