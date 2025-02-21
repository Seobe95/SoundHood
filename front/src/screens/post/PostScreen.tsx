import CustomButton from '@/components/common/CustomButton';
import ContentInput from '@/components/post/ContentInput';
import SongInfo from '@/components/common/SongInfo.tsx';
import { ColorsType, postQueryKeys } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { useForm } from '@/hooks/useForm';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore';
import { RFValue, validatePost } from '@/utils';
import React, { useContext, useEffect } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePostNavigation } from '@/hooks/navigation/usePostNavigation.ts';
import useCurrentLocation from '@/hooks/map/useCurrentLocation.ts';
import { useCreatePost } from '@/hooks/queries/usePost.ts';
import { CreatePostParams, queryClient } from '@/api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import SourceInformationText from '@/components/common/SourceInformationText';

function PostScreen() {
  const themeColor = useContext(ThemeContext);
  const { top, bottom } = useSafeAreaInsets();
  const styles = makeStyles(themeColor, top, bottom);
  const { selectedSong, reset } = useSearchSpotifyStore();
  const { addressName, location } = useCurrentLocation();
  const createPost = useCreatePost();
  const postNavigate = usePostNavigation();
  const rootNavigate =
    useNavigation<StackNavigationProp<RootStackParamList, 'PostNavigator'>>();
  const description = useForm<{ description: string }>({
    initialValue: {
      description: '',
    },
    validate: validatePost,
  });

  function navigateToSearchScreen() {
    postNavigate.navigation.navigate('Search', { searchType: 'SONG' });
  }

  function onSubmit() {
    const post: CreatePostParams['post'] = {
      latitude: location!.latitude,
      longitude: location!.longitude,
      title: selectedSong!.name,
      artist: selectedSong!.artists[0].name,
      description: description.values.description,
      albumCover: selectedSong!.album.images[0].url,
      spotifyURL: selectedSong!.external_urls.spotify,
    };
    createPost.mutate(
      { post: post },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [postQueryKeys.GET_MAKERS],
          });
        },
      },
    );
  }

  useEffect(() => {
    if (createPost.isSuccess) {
      reset();
      const { id } = createPost.data;
      rootNavigate.replace('DetailNavigator', {
        screen: 'Detail',
        params: {
          id: id,
        },
      });
    }
  }, [createPost.data, createPost.isSuccess, reset, rootNavigate]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.fontContainer}>
        {addressName ? (
          <Text style={[styles.font]} allowFontScaling={false}>
            <Text style={styles.boldFont}>{addressName}</Text>에
          </Text>
        ) : (
          <Text style={styles.font} allowFontScaling={false}>
            내가 사는 <Text style={styles.boldFont}>동네</Text>에
          </Text>
        )}
        <Text style={styles.font} allowFontScaling={false}>
          <Text style={styles.boldFont}>좋아하는 노래</Text>를 등록해보세요!
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {selectedSong ? (
          <SongInfo
            title={selectedSong.name}
            artist={selectedSong.artists[0].name}
            imageUri={selectedSong.album.images[0].url}
            onPress={navigateToSearchScreen}
            isButton={true}
          />
        ) : (
          <SongInfo onPress={navigateToSearchScreen} isButton={true} />
        )}
        <ContentInput
          placeholder="음악을 소개해주세요. 최대 40자까지 작성 가능합니다."
          {...description.getTextInputProps('description')}
        />
        <Text style={styles.reportWarningFont}>
          커뮤니티 규칙 위반 내용은 신고 및 삭제될 수 있습니다.
        </Text>
        {selectedSong && <SourceInformationText margin="none" />}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="등록하기"
          onPress={onSubmit}
          invalid={
            !(location !== null && description.isValid && selectedSong !== null)
          }
          isLoading={createPost.isPending}
        />
      </View>
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
    reportWarningFont: {
      fontSize: 12,
      textAlign: 'center',
      fontWeight: '500',
      color: color.fontColorPrimary,
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
