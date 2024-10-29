import React, { useContext } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { Pressable, PressableProps } from 'react-native-gesture-handler';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'large' | 'medium';
  variant?: 'filled' | 'outline';
  invalid?: boolean;
}

function CustomButton({
  label,
  size = 'large',
  variant = 'filled',
  invalid = false,
  ...props
}: CustomButtonProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);
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
      <Text
        style={[
          styles.text,
          styles[`${variant}Text`],
          invalid && styles.invalidText,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      borderRadius: Platform.OS === 'android' ? 4 : 3,
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
      color: color.fontColorPrimary,
    },
    outlineText: {
      color: color.BLUE_400,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    invalidText: {
      color: color.fontColorSecondary,
    },
  });

export default CustomButton;
