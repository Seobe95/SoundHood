/* eslint-disable react/no-unstable-nested-components */
import Container from '@/components/common/Container';
import SongInfo from '@/components/common/SongInfo';
import {
  detailStackNavigations,
  myPageStackNavigations,
  rootStackNavigations,
} from '@/constants';
import { useGetMyPosts } from '@/hooks/queries/usePost';
import { DetailStackParamList } from '@/navigators/detail/DetailNavigator';
import { MyPageStackParamList } from '@/navigators/mypage/MyPageNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EmptyScreen from '../common/EmptyScreen';
import { RootStackParamList } from '@/navigators/root/RootNavigator';
import { useRefreshOnFocus } from '@/hooks/common/useRefreshOnFocus';

type MyPostsScreenProps = CompositeScreenProps<
  StackScreenProps<
    MyPageStackParamList,
    typeof myPageStackNavigations.MY_POST_PAGE
  >,
  StackScreenProps<RootStackParamList, typeof rootStackNavigations.DETAIL>
>;

function MyPostsScreen({ navigation }: MyPostsScreenProps) {
  const { data, refetch, isError } = useGetMyPosts();
  const informationMessage = isError
    ? '내가 등록한 음악을 불러오는데 실패했어요.'
    : '등록한 음악이 없어요...🥲';

  useRefreshOnFocus(refetch);

  function handleNavigateToDetailScreen({ postId }: { postId: string }) {
    navigation.navigate('DetailNavigator', {
      screen: 'Detail',
      params: {
        id: postId,
      },
    });
  }

  return (
    <Container>
      <FlatList
        style={styles.listContainer}
        data={data}
        renderItem={post => {
          const { albumCover, artist, title, id } = post.item;
          return (
            <SongInfo
              key={id}
              artist={artist}
              title={title}
              imageUri={albumCover}
              size={'small'}
              isButton
              onPress={() => handleNavigateToDetailScreen({ postId: id })}
            />
          );
        }}
        ListEmptyComponent={() => (
          <EmptyScreen informationMessage={informationMessage} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: '100%',
  },
});

export default MyPostsScreen;
