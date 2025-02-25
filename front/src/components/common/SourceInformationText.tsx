import React from 'react';
import { Image, StyleSheet, TextProps, View } from 'react-native';
import CustomFont from './CustomFont';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from '@/utils';

interface SourceInformationTextProps extends TextProps {
  margin?: 'none' | 'small' | 'large';
}

function SourceInformationText({
  margin = 'large',
  style,
}: SourceInformationTextProps) {
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(top);
  return (
    <View style={[styles.container, styles[`${margin}Margin`]]}>
      <CustomFont style={[style]} fontSize={10}>
        앨범 커버 출처: Spotify
      </CustomFont>
      <Image
        source={require('../../assets/logo/spotify_green.png')}
        resizeMethod="resize"
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
}

const makeStyles = (top = 0) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    noneMargin: {
      marginRight: 0,
    },
    smallMargin: {
      marginRight: 16,
    },
    largeMargin: {
      marginRight: 32,
    },
    image: {
      width: RFValue(10, top),
      height: RFValue(10, top),
      marginLeft: 4,
    },
  });

export default SourceInformationText;
