import { myPageStackNavigations } from '@/constants';
import MypageHome from '@/screens/mypage/MypageHome';
import NicknameChangeScreen from '@/screens/mypage/NicknameChangeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MyPostsScreen from '../../screens/mypage/MyPostsScreen';
import { useContext } from 'react';
import { ThemeContext } from '@/context/CustomThemeContext';
import { Platform } from 'react-native';
import HeaderLeftButton from '@/components/common/HeaderLeftButton';

export type MyPageStackParamList = {
  [myPageStackNavigations.NICKNAME_CHANGE]: undefined;
  [myPageStackNavigations.MY_POST_PAGE]: undefined;
  [myPageStackNavigations.MY_PAGE_HOME]: undefined;
};

const MyPageStack = createStackNavigator<MyPageStackParamList>();

function MyPageNavigator() {
  const theme = useContext(ThemeContext);
  const isAndroid = Platform.OS === 'android';
  function handleHeaderTitle(title: string) {
    switch (title) {
      case myPageStackNavigations.MY_PAGE_HOME:
        return '마이페이지';
      case myPageStackNavigations.MY_POST_PAGE:
        return '내가 작성한 글';
      case myPageStackNavigations.NICKNAME_CHANGE:
        return '닉네임 변경';
      default:
        return '마이페이지';
    }
  }
  return (
    <MyPageStack.Navigator
      initialRouteName={myPageStackNavigations.MY_PAGE_HOME}
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: handleHeaderTitle(route.name),
        headerBackTitle: '이전',
        headerStyle: {
          backgroundColor: theme.backgroundColor,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: { color: theme.fontColorPrimary },
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
      <MyPageStack.Screen
        component={MypageHome}
        name={myPageStackNavigations.MY_PAGE_HOME}
      />
      <MyPageStack.Screen
        component={NicknameChangeScreen}
        name={myPageStackNavigations.NICKNAME_CHANGE}
      />
      <MyPageStack.Screen
        component={MyPostsScreen}
        name={myPageStackNavigations.MY_POST_PAGE}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageNavigator;
