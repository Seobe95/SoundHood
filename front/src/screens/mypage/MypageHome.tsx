import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AuthRequiredScreen from '../auth/AuthRequiredScreen';
import Container from '@/components/common/Container';
import {
  alertMessages,
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
import useDeleteAccount from '@/hooks/auth/useDeleteAccount';
import { MypageNavigateTitle } from '@/constants/navigateTitle';
import { alertHandler } from '@/utils';

const myPageNavigationData: NavigationListType<MyPageNavigationType>[] = [
  {
    screen: myPageStackNavigations.MY_POST_PAGE,
    icon: 'newspaper-outline',
    title: MypageNavigateTitle.MY_POST_PAGE,
  },
  {
    screen: myPageStackNavigations.NICKNAME_CHANGE,
    icon: 'id-card-outline',
    title: MypageNavigateTitle.NICKNAME_CHANGE,
  },
  {
    title: MypageNavigateTitle.LOGOUT,
    icon: 'log-out-outline',
  },
  {
    title: MypageNavigateTitle.DELETE_ACCOUNT,
    icon: 'person-remove-outline',
  },
];

type MypageHomeProps = CompositeScreenProps<
  StackScreenProps<MyPageStackParamList>,
  StackScreenProps<RootStackParamList>
>;

function MypageHome({ navigation }: MypageHomeProps) {
  const { isLogin, logout, userInfo } = useContext(AuthContext);
  const { logoutMutation } = useAuth();
  const { handleDeleteAccount } = useDeleteAccount();

  function handleNavigateButton(title: string) {
    switch (title) {
      case MypageNavigateTitle.MY_POST_PAGE:
        navigation.navigate(rootStackNavigations.MYPAGE, {
          screen: myPageStackNavigations.MY_POST_PAGE,
        });
        break;
      case MypageNavigateTitle.NICKNAME_CHANGE:
        navigation.navigate(rootStackNavigations.MYPAGE, {
          screen: myPageStackNavigations.NICKNAME_CHANGE,
        });
        break;
      case MypageNavigateTitle.LOGOUT:
        logoutHandler();
        break;
      case MypageNavigateTitle.DELETE_ACCOUNT:
        alertHandler('DELETE_ACCOUNT', () => {
          handleDeleteAccount(userInfo?.loginType, () => {
            navigation.goBack();
          });
        });

        break;
    }
  }

  function logoutHandler() {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          logout();
          navigation.goBack();
        },
      },
    );
  }

  return (
    <Container>
      {isLogin ? (
        <FlatList
          style={styles.list}
          data={myPageNavigationData}
          renderItem={item => {
            const { icon, screen, title } = item.item;
            return (
              <NavigationListItem
                icon={icon}
                title={title}
                onPress={() => handleNavigateButton(title)}
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

const styles = StyleSheet.create({
  list: {
    height: '100%',
  },
});

export default MypageHome;
