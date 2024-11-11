import React, { useContext } from 'react';
import { StyleSheet, PressableProps, Pressable, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ColorsType } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';

interface FloatingButtonProps extends PressableProps {}

function FloatingButton({ ...props }: FloatingButtonProps) {
  const inset = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        { top: inset.top || 20 },
        pressed && styles.pressedButtonContainer,
      ]}
      {...props}>
      {({ pressed }) => (
        <Icon
          name="musical-notes-outline"
          size={25}
          style={pressed ? styles.pressedIconContainer : styles.iconContainer}
        />
      )}
    </Pressable>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      width: 45,
      height: 45,
      right: 12,
      top: 20,
      borderRadius: 50,
      borderWidth: Platform.OS === 'ios' ? 3 : 2,
      borderColor: color.BLUE_300,
    },
    pressedButtonContainer: {
      backgroundColor: '#888888',
    },
    iconContainer: {
      color: '#333333',
      // color: '#838383',
    },
    pressedIconContainer: {
      color: '#424242',
    },
  });

export default FloatingButton;
