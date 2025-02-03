import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { RFValue } from '@/utils';
import React, { ReactNode, useContext } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomFontProps extends TextProps {
  children: ReactNode;
  fontSize?: number;
}

function CustomFont({ children, fontSize = 16, ...props }: CustomFontProps) {
  const theme = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(theme, top, fontSize);
  return (
    <Text {...props} style={[styles.font, props.style]}>
      {children}
    </Text>
  );
}

const makeStyles = (color: ColorsType, top = 0, size: number) =>
  StyleSheet.create({
    font: {
      color: color.fontColorPrimary,
      fontSize: RFValue(size, top),
    },
  });

export default CustomFont;
