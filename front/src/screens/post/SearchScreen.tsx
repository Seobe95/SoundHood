import SearchResultList from '@/components/post/SearchResultList';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { useGetSpotifyAccessToken } from '@/hooks/queries/useSpotify';
import { PostStackParamList } from '@/navigators/post/PostNavigator';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchScreenProps = StackScreenProps<PostStackParamList, 'Search'>;

function SearchScreen({ navigation }: SearchScreenProps) {
  const spotifyAccessTokenQuery = useGetSpotifyAccessToken();
  const { reset } = useSearchSpotifyStore();
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);

  useEffect(() => {
    if (spotifyAccessTokenQuery.isSuccess) {
      console.log('Get');
    }
  }, [spotifyAccessTokenQuery.isSuccess]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchResultList />
    </SafeAreaView>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 16 : 0,
    },
  });

export default SearchScreen;
