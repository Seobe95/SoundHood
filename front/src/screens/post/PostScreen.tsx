import SongInfo from '@/components/post/SongInfo';
import { ColorsType, rootStackNavigations } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { PostStackParamList } from '@/navigators/post/PostNavigator';
import { RootStackParamList } from '@/navigators/root/RootNavigator';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import {
  EventArg,
  NavigationAction,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PostScreenProps = StackNavigationProp<
  RootStackParamList,
  typeof rootStackNavigations.POST
>;

function PostScreen() {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);
  const { selectedSong, reset } = useSearchSpotifyStore();
  const postNavigate = useNavigation<StackNavigationProp<PostStackParamList>>();
  const rootNavigate = useNavigation<PostScreenProps>();
  const navigateToSearchScreen = () => {
    postNavigate.navigate('Search');
  };

  useEffect(() => {
    const beforeRemoveHandler = (
      e: EventArg<
        'beforeRemove',
        true,
        {
          action: NavigationAction;
        }
      >,
    ) => {
      e.preventDefault();
      Alert.alert('Test', 'test', [
        { text: 'calcel', style: 'cancel', onPress: () => {} },
        {
          text: 'remove',
          style: 'destructive',
          onPress: () => {
            rootNavigate.dispatch(e.data.action);
            reset();
          },
        },
      ]);
    };

    rootNavigate.addListener('beforeRemove', beforeRemoveHandler);
    return () => {
      rootNavigate.removeListener('beforeRemove', beforeRemoveHandler);
    };
  }, [rootNavigate, reset]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fontContainer}>
        <Text style={styles.font}>
          내가 사는 <Text style={styles.boldFont}>동네</Text>에
        </Text>
        <Text style={styles.font}>
          <Text style={styles.boldFont}>좋아하는 노래</Text>를 등록해보세요!
        </Text>
      </View>
      {selectedSong ? (
        <SongInfo song={selectedSong} onPress={navigateToSearchScreen} />
      ) : (
        <SongInfo onPress={navigateToSearchScreen} />
      )}
    </SafeAreaView>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 32,
    },
    fontContainer: {
      marginBottom: 32,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: Platform.OS === 'android' ? 24 : 32,
      fontWeight: '300',
    },
    boldFont: {
      fontWeight: 'bold',
    },
  });

export default PostScreen;
