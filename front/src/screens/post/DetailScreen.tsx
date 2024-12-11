import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  ColorsType,
  detailStackNavigations,
  postQueryKeys,
  toastMessages,
} from '@/constants';
import { DetailStackParamList } from '@/navigators/detail/DetailNavigator.tsx';
import {
  useDeletePost,
  useReadPostById,
  useUpdateLikePost,
} from '@/hooks/queries/usePost.ts';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderRightButton from '@/components/common/HeaderRightButton.tsx';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '@/components/common/CustomButton.tsx';
import { RFValue } from '@/utils';
import SongInfo from '@/components/post/SongInfo.tsx';
import CustomActionSheet from '@/components/common/CustomActionSheet.tsx';
import UserInfo from '@/components/detail/UserInfo.tsx';
import { alertHandler } from '@/utils';
import { queryClient } from '@/api';
import useActionSheet from '@/hooks/common/useActionSheet.ts';
import { ToastContext } from '@/context/ToastContext.tsx';

type DetailScreenProps = {} & DetailStackScreenProps;

type DetailStackScreenProps = StackScreenProps<
  DetailStackParamList,
  typeof detailStackNavigations.DETAIL
>;

const deviceHeight = Dimensions.get('screen').height;

function DetailScreen({ navigation, route }: DetailScreenProps) {
  const { top } = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const styles = makeStyles(theme, top);
  const { show: toastShow } = useContext(ToastContext);
  const { show, hide, isOpen } = useActionSheet();
  const { data, isSuccess, isError } = useReadPostById({
    id: route.params.id,
  });
  const handlePostLike = useUpdateLikePost({
    mutationOptions: {
      onSuccess: () => {
        setIsLike(prev => !prev);
        isLike
          ? setLikeCount(prev => prev - 1)
          : setLikeCount(prev => prev + 1);
      },
    },
  });
  const { mutate } = useDeletePost({
    mutationOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [postQueryKeys.READ_POST_BY_ID],
        });
        hide();
        navigation.goBack();
        toastShow({ message: toastMessages.DELETE.SUCCESS, time: 'short' });
      },
    },
  });

  function handleDelete() {
    alertHandler('DELETE', () => {
      mutate({ id: route.params.id });
    });
  }

  function handleReport() {
    hide();
    navigation.navigate('Report', {
      id: data!.id,
    });
  }

  function handleLike() {
    handlePostLike.mutate({ id: route.params.id });
  }

  const handleSpotify = useCallback(async () => {
    const supported = await Linking.canOpenURL(data!.spotifyURL);
    if (supported) {
      await Linking.openURL(data!.spotifyURL);
    } else {
      toastShow({ message: 'Spotify를 열 수 없습니다.', time: 'long' });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setIsLike(data.hasLiked);
      setLikeCount(data.likeCount);
      navigation.setOptions({
        title: data.title,
        headerRight: () => {
          return (
            <HeaderRightButton onPress={show}>
              <Icon
                name={'ellipsis-horizontal-circle-outline'}
                size={30}
                color={theme.fontColorPrimary}
              />
            </HeaderRightButton>
          );
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && !data) {
      alertHandler('DETAIL', () => {
        navigation.goBack();
      });
    }
  }, [isError]);

  console.log(isOpen, 'detail');

  return (
    <>
      <View style={styles.container}>
        {data && (
          <View style={styles.songContainer}>
            <SongInfo
              title={data.title}
              artist={data.artist}
              imageUri={data.albumCover}
              disabled={true}
            />
            <View style={styles.descriptionContainer}>
              <Text style={[styles.text, styles.descriptionText]}>
                {data.description}
              </Text>
              <UserInfo nickname={data.author.nickname} likeCount={likeCount} />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.likeButton} onPress={handleLike}>
                <Icon
                  name={'heart'}
                  size={20}
                  color={isLike ? theme.PINK_200 : '#ffffff'}
                />
                <Text style={styles.likeButtonText}>좋아요</Text>
              </Pressable>
              <CustomButton
                label={'Spotify에서 듣기'}
                size={'medium'}
                variant={'spotify'}
                onPress={handleSpotify}
              />
            </View>
          </View>
        )}
      </View>
      <CustomActionSheet isOpen={isOpen} hide={hide}>
        {data?.isMyPost ? (
          <>
            <CustomButton
              label={'수정하기'}
              size={'large'}
              variant={'filled'}
              onPress={() => {
                hide();
                navigation.navigate('Edit', {
                  data,
                });
              }}
            />
            <CustomButton
              label={'삭제하기'}
              size={'large'}
              variant={'filled'}
              onPress={handleDelete}
            />
          </>
        ) : (
          <>
            <CustomButton
              label={'신고하기'}
              size={'large'}
              variant={'filled'}
              onPress={handleReport}
            />
          </>
        )}
        <CustomButton
          label={'취소'}
          size={'large'}
          variant={'outline'}
          onPress={hide}
        />
      </CustomActionSheet>
    </>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      height: '100%',
      width: '100%',
      backgroundColor: color.backgroundColor,
    },
    songContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      gap: 8,
      bottom: 20,
    },
    songInfoContainer: {
      flexDirection: 'row',
    },
    imageContainer: {
      width: 100,
      height: 100,
    },
    text: {
      color: color.fontColorPrimary,
    },
    titleText: {
      fontSize: RFValue(24, top),
    },
    artistTest: {
      fontSize: RFValue(18, top),
    },
    descriptionContainer: {
      borderColor: color.borderColor,
      borderRadius: 16,
      padding: deviceHeight > 700 ? 16 : 10,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: color.backgroundColorSecondary,
      height: 130,
      width: '100%',
      marginBottom: 8,
    },
    descriptionText: {
      fontSize: RFValue(16, top),
    },

    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      alignContent: 'center',
      justifyContent: 'space-between',
    },
    likeButton: {
      backgroundColor: color.BLUE_300,
      borderRadius: 8,
      width: '47%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    likeButtonText: {
      fontSize: RFValue(16, top),
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  });

export default DetailScreen;
