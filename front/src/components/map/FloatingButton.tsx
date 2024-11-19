import React, { useContext, useRef } from 'react';
import {
  StyleSheet,
  PressableProps,
  Pressable,
  Platform,
  View,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ColorsType } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { RFValue } from '@/utils';

interface FloatingButtonProps extends PressableProps {}

function FloatingButton({ ...props }: FloatingButtonProps) {
  const inset = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme, inset.top);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
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

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    buttonContainer: {
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      width: 45,
      height: 45,
      borderRadius: 50,
      borderWidth: Platform.OS === 'ios' ? 3 : 2,
      borderColor: color.BLUE_300,
    },
    pressedButtonContainer: {
      backgroundColor: '#888888',
    },
    iconContainer: {
      color: '#333333',
    },
    pressedIconContainer: {
      color: '#424242',
    },
  });

export default FloatingButton;
