import React, { useContext } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Pressable, PressableProps } from 'react-native-gesture-handler';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from '@/utils';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'large' | 'medium';
  variant?: 'filled' | 'outline';
  invalid?: boolean;
  isLoading?: boolean;
}

function CustomButton({
  label,
  size = 'large',
  variant = 'filled',
  invalid = false,
  isLoading = false,
  ...props
}: CustomButtonProps) {
  const themeColor = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(themeColor, top);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        invalid && styles.invaildFilled,
      ]}
      disabled={invalid}
      {...props}>
      {isLoading ? (
        <View></View>
      ) : (
        <Text
          style={[
            styles.text,
            styles[`${variant}Text`],
            invalid && styles.invalidText,
          ]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      justifyContent: 'center',
    },
    large: {
      width: '100%',
      paddingVertical: 16,
      alignItems: 'center',
    },
    medium: {
      width: '50%',
      paddingVertical: 12,
      alignItems: 'center',
    },
    filled: {
      backgroundColor: color.BLUE_400,
    },
    invaildFilled: {
      backgroundColor: color.backgroundColorSecondary,
    },
    outline: {
      borderColor: color.BLUE_400,
      borderWidth: 1,
    },
    filledPressed: {
      backgroundColor: color.BLUE_300,
    },
    outlinePressed: {
      borderColor: color.BLUE_200,
      borderWidth: 1,
    },
    filledText: {
      color: '#FFFFFF',
    },
    outlineText: {
      color: color.BLUE_400,
    },
    text: {
      fontSize: RFValue(16, top),
      fontWeight: 'bold',
    },
    invalidText: {
      color: color.fontColorSecondary,
    },
  });

export default CustomButton;
