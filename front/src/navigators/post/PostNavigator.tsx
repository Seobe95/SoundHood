/* eslint-disable react/no-unstable-nested-components */
import HeaderLeftButton from '@/components/common/HeaderLeftButton';
import HeaderRightButton from '@/components/common/HeaderRightButton';
import { ColorsType, postStackNavigations } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import PostScreen from '@/screens/post/PostScreen';
import SearchScreen from '@/screens/post/SearchScreen';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';

interface PostNavigatorProps {}

export type PostStackParamList = {
  [postStackNavigations.POST]: undefined;
  [postStackNavigations.SEARCH]: undefined;
};

const PostStackNavigator = createStackNavigator<PostStackParamList>();

function PostNavigator({}: PostNavigatorProps) {
  const theme = useContext(ThemeContext);
  const { selectedSong } = useSearchSpotifyStore();
  return (
    <PostStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PostStackNavigator.Screen
        options={{
          headerShown: true,
          headerLeft: props => <HeaderLeftButton {...props} label="취소" />,
          headerTitle: '음악 등록',
          headerTitleStyle: { color: theme.fontColorPrimary },
          // headerRight: () => <HeaderRightButton label="등록" />,
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
