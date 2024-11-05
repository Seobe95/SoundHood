import { useSpotify } from '@/hooks/queries/useSpotify';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import React, { useContext } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import SearchBar from './SearchInput';
import SongInfo from './SongInfo';
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
function SearchResultList() {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { onChangeText } = useSpotify();
  const { searchResult, setSelectedSong } = useSearchSpotifyStore();
  const navigation = useNavigation<StackNavigationProp<PostStackParamList>>();
  const handlePressSong = async (song: TrackItems) => {
    setSelectedSong(song);
    navigation.goBack();
  };

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
            song={item}
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

export default SearchResultList;
