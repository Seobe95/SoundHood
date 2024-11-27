import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ColorsType, detailStackNavigations } from '@/constants';
import { DetailStackParamList } from '@/navigators/detail/DetailNavigator.tsx';
import { useReadPostById, useUpdateLikePost } from '@/hooks/queries/usePost.ts';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderRightButton from '@/components/common/HeaderRightButton.tsx';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '@/components/common/CustomButton.tsx';
import { RFValue } from '@/utils';
import SongInfo from '@/components/post/SongInfo.tsx';

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
  const styles = makeStyles(theme, top);
  const { data, isSuccess } = useReadPostById({
    id: route.params.id,
  });
  const handlePostLike = useUpdateLikePost({
    mutationOptions: {
      onSuccess: () => {
        setIsLike(prev => !prev);
      },
      onError: data => {
        console.log('FFF');
      },
    },
  });

  function handleLike() {
    handlePostLike.mutate({ id: route.params.id });
  }

  useEffect(() => {
    if (data) {
      setIsLike(data.hasLiked);
      navigation.setOptions({
        title: data.title,
        headerRight: () => {
          return (
            <HeaderRightButton>
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
  return (
    <View style={styles.container}>
      {data && (
        <View style={styles.songContainer}>
          <SongInfo
            title={data.title}
            artist={'한로로'}
            imageUri={data.albumCover}
            disabled={true}
          />
          <View style={styles.descriptionContainer}>
            <Text style={[styles.text, styles.descriptionText]}>
              <Text style={styles.nicknameText}>닉네임</Text>
              {`\n`}
              {data.description}
            </Text>
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
            />
          </View>
        </View>
      )}
    </View>
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
      flexDirection: 'row',
      backgroundColor: color.backgroundColorSecondary,
      height: 130,
      width: '100%',
      marginBottom: 8,
    },
    descriptionText: {
      fontSize: RFValue(16, top),
    },
    nicknameText: {
      fontSize: RFValue(18, top),
      marginBottom: 8,
      fontWeight: 'bold',
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
