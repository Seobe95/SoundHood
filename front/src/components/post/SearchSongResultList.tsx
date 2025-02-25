import {
  useGetSpotifyAccessToken,
  useSpotify,
} from '@/hooks/queries/useSpotify';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import React, { useContext, useEffect } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import SearchBar from './SearchInput';
import SongInfo from '../common/SongInfo.tsx';
import { ThemeContext } from '@/context/CustomThemeContext';
import { ColorsType } from '@/constants';
import { TrackItems } from '@/api/spotify';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostStackParamList } from '@/navigators/post/PostNavigator';
import { useNavigation } from '@react-navigation/native';

/**
 *
 * @Todo Infinity Scroll 구현 필요
 */
function SearchSongResultList() {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { onChangeText } = useSpotify();
  const spotifyAccessTokenQuery = useGetSpotifyAccessToken();
  const { searchResult, setSelectedSong } = useSearchSpotifyStore();
  const navigation = useNavigation<StackNavigationProp<PostStackParamList>>();
  const handlePressSong = async (song: TrackItems) => {
    setSelectedSong(song);
    navigation.goBack();
  };

  useEffect(() => {
    if (spotifyAccessTokenQuery.isSuccess) {
      console.log('Get');
    }
  }, [spotifyAccessTokenQuery.isSuccess]);

  return (
    <FlatList
      data={searchResult}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <SearchBar
            placeholder="노래나 가수를 검색해보세요!"
            onChangeText={onChangeText}
          />
        </View>
      }
      keyExtractor={item => item.id + item.album.id}
      renderItem={({ item }) => {
        return (
          <SongInfo
            size="small"
            title={item.name}
            artist={item.artists[0].name}
            imageUri={item.album.images[0].url}
            onPress={() => {
              handlePressSong(item);
            }}
          />
        );
      }}
      stickyHeaderIndices={[0]}
      onScrollBeginDrag={() => Keyboard.dismiss()}
    />
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    headerContainer: {
      paddingHorizontal: 16,
      backgroundColor: color.backgroundColor,
      paddingBottom: 8,
    },
  });

export default SearchSongResultList;
