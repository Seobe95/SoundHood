import React from 'react';
import { StyleSheet, TextProps, View } from 'react-native';
import CustomFont from './CustomFont';

interface SourceInformationTextProps extends TextProps {
  margin?: 'none' | 'small' | 'large';
}

function SourceInformationText({
  margin = 'large',
  style,
}: SourceInformationTextProps) {
  return (
    <View style={styles.container}>
      <CustomFont
        style={[styles.text, styles[`${margin}Margin`], style]}
        fontSize={10}>
        앨범 커버 출처: Spotify
      </CustomFont>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: { textAlign: 'right' },
  noneMargin: {
    marginRight: 0,
  },
  smallMargin: {
    marginRight: 16,
  },
  largeMargin: {
    marginRight: 32,
  },
});

export default SourceInformationText;
