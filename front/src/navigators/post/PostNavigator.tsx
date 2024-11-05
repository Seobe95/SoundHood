import { postStackNavigations } from '@/constants';
import PostScreen from '@/screens/post/PostScreen';
import SearchScreen from '@/screens/post/SearchScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PostNavigatorProps {}

export type PostStackParamList = {
  [postStackNavigations.POST]: undefined;
  [postStackNavigations.SEARCH]: undefined;
};

const PostStackNavigator = createStackNavigator<PostStackParamList>();

function PostNavigator({}: PostNavigatorProps) {
  return (
    <PostStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PostStackNavigator.Screen
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

const styles = StyleSheet.create({});

export default PostNavigator;
