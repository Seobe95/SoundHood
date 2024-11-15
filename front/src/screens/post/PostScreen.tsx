import CustomButton from '@/components/common/CustomButton';
import ContentInput from '@/components/post/ContentInput';
import SongInfo from '@/components/post/SongInfo';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { useForm } from '@/hooks/useForm';
import { PostStackParamList } from '@/navigators/post/PostNavigator';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import { RFValue, validatePost } from '@/utils';
import React, { useContext } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePostNavigation } from '@/hooks/navigation/usePostNavigation.ts';
import { useKeyboardVisibility } from '@/hooks/keyboard/useKeyboardVisibility.ts';

function PostScreen() {
  const themeColor = useContext(ThemeContext);
  const { top, bottom } = useSafeAreaInsets();
  const styles = makeStyles(themeColor, top, bottom);
  const { selectedSong } = useSearchSpotifyStore();
  const postNavigate = usePostNavigation<PostStackParamList>();
  const content = useForm({
    initialValue: { content: '' },
    validate: validatePost,
  });
  const { isKeyboardVisible } = useKeyboardVisibility();
  const navigateToSearchScreen = () => {
    postNavigate.navigation.navigate('Search', { searchType: 'SONG' });
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.fontContainer}>
        <Text style={styles.font} allowFontScaling={false}>
          내가 사는 <Text style={styles.boldFont}>동네</Text>에
        </Text>
        <Text style={styles.font} allowFontScaling={false}>
          <Text style={styles.boldFont}>좋아하는 노래</Text>를 등록해보세요!
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {selectedSong ? (
          <SongInfo song={selectedSong} onPress={navigateToSearchScreen} />
        ) : (
          <SongInfo onPress={navigateToSearchScreen} />
        )}
        <ContentInput
          placeholder="음악을 소개해주세요. 최대 40자까지 작성 가능합니다."
          {...content.getTextInputProps('content')}
        />
      </View>
      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
          <CustomButton label="등록하기" disabled={content.isVaild} />
        </View>
      )}
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top: number, bottom: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 32,
    },
    fontContainer: {
      marginBottom: 32,
      flex: 0,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: RFValue(28, top),
      fontWeight: '300',
    },
    boldFont: {
      fontWeight: 'bold',
    },
    contentContainer: {
      gap: 16,
      flex: 2,
    },
    buttonContainer: {
      marginBottom: 16 + bottom,
    },
  });

export default PostScreen;
