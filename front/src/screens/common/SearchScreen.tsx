import SearchSongResultList from '@/components/post/SearchSongResultList.tsx';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { PostStackParamList } from '@/navigators/post/PostNavigator.tsx';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchAddressResultList from '@/components/map/SearchAddressResultList.tsx';

type SearchScreenProps = StackScreenProps<PostStackParamList, 'Search'>;

function SearchScreen({ route }: SearchScreenProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);

  return (
    <SafeAreaView style={styles.container}>
      {route.params.searchType === 'SONG' ? (
        <SearchSongResultList />
      ) : (
        <SearchAddressResultList />
      )}
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
