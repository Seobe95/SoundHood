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

const deviceHeight = Dimensions.get('window').height;

function FloatingContainer({ ...props }: FloatingButtonProps) {
  const inset = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme, inset.top);
  const inputRef = useRef<TextInput | null>(null);
  return (
    <View style={[styles.container, { top: inset.top || 20 }]}>
      <Pressable
        style={[styles.inputContainer]}
        onPress={() => {
          inputRef.current?.focus();
        }}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={theme.fontColorSecondary}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          placeholder={'음악들이 궁금한 동네를 검색해보세요!'}
        />
      </Pressable>
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
    </View>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      maxHeight: 50,
    },
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
    inputContainer: {
      backgroundColor: color.backgroundColor,
      flex: 1,
      padding: 14,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: color.BLUE_300,
    },
    iconContainer: {
      color: '#333333',
    },
    input: {
      fontSize: RFValue(16, top),
      color: color.fontColorPrimary,
      padding: 0,
    },
    pressedIconContainer: {
      color: '#424242',
    },
  });

export default FloatingContainer;
