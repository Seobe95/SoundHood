import { TrackItems } from '@/api/spotify';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { RFValue } from '@/utils';
import React, { useContext } from 'react';
import {
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface SongInfoProps extends PressableProps {
  size?: 'large' | 'small';
  song?: TrackItems;
}

function SongInfo({ size = 'large', song, ...props }: SongInfoProps) {
  const theme = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(theme, top);
  const title = song?.name;
  const artist = song?.artists[0].name;
  const imageUri = song?.album.images[0].url;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed
          ? styles[`${size}PressedContainer`]
          : styles[`${size}Container`],
      ]}
      {...props}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            resizeMode="contain"
            style={[styles[`${size}Image`]]}
            source={{
              uri: imageUri,
            }}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={[styles[`${size}Image`]]}
            source={require('../../assets/common/vinyl.png')}
          />
        )}
      </View>
      {title ? (
        <View style={styles.fontContainer}>
          <Text
            style={[styles.font, styles[`${size}TitleFont`]]}
            numberOfLines={size === 'large' ? 2 : 1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={[styles.font, styles[`${size}ArtistFont`]]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {artist}
          </Text>
        </View>
      ) : (
        <View style={styles.fontContainer}>
          <Text style={[styles.font, styles[`${size}TitleFont`]]}>
            노래 검색하기
          </Text>
        </View>
      )}
      {!song && <Icon name="chevron-forward" size={25} style={styles.icon} />}
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    largeContainer: {
      backgroundColor: color.backgroundColorSecondary,
      borderRadius: 16,
      padding: 16,
    },
    largePressedContainer: {
      backgroundColor: color.pressedBackgroundColorSecondary,
      borderRadius: 16,
      padding: 16,
    },
    smallPressedContainer: {
      backgroundColor: color.backgroundColorSecondary,
      paddingHorizontal: 16,
      paddingVertical: 4,
    },
    smallContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    imageContainer: {},
    largeImage: {
      width: 80,
      height: 80,
    },
    smallImage: {
      width: 60,
      height: 60,
    },
    fontContainer: {
      paddingLeft: 16,
      gap: 8,
      flex: 1,
    },
    font: {
      color: color.fontColorPrimary,
    },
    largeTitleFont: {
      fontSize: RFValue(24, top),
    },
    smallTitleFont: {
      fontSize: RFValue(18, top),
    },
    largeArtistFont: {
      fontSize: RFValue(18, top),
    },
    smallArtistFont: {
      fontSize: RFValue(16, top),
    },
    icon: {
      flex: 0,
      color: color.fontColorPrimary,
      fontWeight: '100',
    },
  });

export default SongInfo;
