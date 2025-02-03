/* eslint-disable react/no-unstable-nested-components */
import HeaderLeftButton from '@/components/common/HeaderLeftButton';
import { postStackNavigations } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import PostScreen from '@/screens/post/PostScreen';
import SearchScreen from '@/screens/common/SearchScreen.tsx';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { Platform } from 'react-native';

interface PostNavigatorProps {}

export type PostStackParamList = {
  [postStackNavigations.POST]: undefined;
  [postStackNavigations.SEARCH]: {
    searchType: 'ADDRESS' | 'SONG';
  };
};

const PostStackNavigator = createStackNavigator<PostStackParamList>();

function PostNavigator({}: PostNavigatorProps) {
  const theme = useContext(ThemeContext);
  const isAndroid = Platform.OS === 'android';
  return (
    <PostStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PostStackNavigator.Screen
        options={{
          headerShown: true,
          headerLeft: props =>
            isAndroid ? (
              <HeaderLeftButton
                {...props}
                label="취소"
                tintColor={theme.fontColorPrimary}
              />
            ) : undefined,
          headerTitle: '음악 등록',
          headerTitleStyle: { color: theme.fontColorPrimary },
          headerRightContainerStyle: {
            paddingRight: 8,
          },
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
        name={postStackNavigations.POST}
        component={PostScreen}
      />
      <PostStackNavigator.Screen
        name={postStackNavigations.SEARCH}
        component={SearchScreen}
      />
    </PostStackNavigator.Navigator>
  );
}

export default PostNavigator;
