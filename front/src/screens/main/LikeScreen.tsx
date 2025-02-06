import Container from '@/components/common/Container';
import CustomFont from '@/components/common/CustomFont';
import SongInfo from '@/components/common/SongInfo';
import { mainTabNavigations, rootStackNavigations } from '@/constants';
import { AuthContext } from '@/context/AuthContext';
import { useGetUsersLikePosts } from '@/hooks/queries/usePost';
import { RootStackParamList } from '@/navigators/root/RootNavigator';
import { MainTabParamList } from '@/navigators/tab/TabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AuthRequiredScreen from '../auth/AuthRequiredScreen';
import { useRefreshOnFocus } from '@/hooks/common/useRefreshOnFocus';

type LikeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.LIKE>,
  StackScreenProps<RootStackParamList, typeof rootStackNavigations.MAIN_TAP>
>;

function EmptyLikeScreen() {
  return (
    <View style={styles.empty}>
      <CustomFont>좋아요를 누른 음악이 없어요...🥲</CustomFont>
    </View>
  );
}

function LikeScreen({ navigation }: LikeScreenProps) {
  const { isLogin } = useContext(AuthContext);
  const { data, isSuccess, refetch } = useGetUsersLikePosts();

  useRefreshOnFocus(refetch);

  function handleNavigateToDetailScreen({ postId }: { postId: string }) {
    navigation.navigate('DetailNavigator', {
      screen: 'Detail',
      params: {
        id: postId,
      },
    });
  }

  function handleNavigateToAuthHomeScreen() {
    navigation.navigate('AuthNavigator', {
      screen: 'AuthHome',
    });
  }

  return (
    <Container>
      {isLogin ? (
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
          ListEmptyComponent={EmptyLikeScreen}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <AuthRequiredScreen
          instruction="이 화면은 로그인 후 확인이 가능해요!"
          handleNavigate={handleNavigateToAuthHomeScreen}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: '100%',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LikeScreen;
