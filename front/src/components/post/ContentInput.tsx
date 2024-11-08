import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { RFValue } from '@/utils';
import React, { useContext, useRef } from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContentInputProps extends TextInputProps {}

const deviceHeight = Dimensions.get('screen').height;

function ContentInput({ ...props }: ContentInputProps) {
  const innerRef = useRef<TextInput | null>(null);
  const theme = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(theme, top);
  return (
    <Pressable style={styles.container}>
      <TextInput
        ref={innerRef}
        placeholderTextColor={theme.fontColorSecondary}
        style={[styles.input]}
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        onSubmitEditing={() => Keyboard.dismiss()}
        multiline={true}
        maxLength={40}
        returnKeyType="default"
        {...props}
      />
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    container: {
      // borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: 16,
      padding: deviceHeight > 700 ? 16 : 10,
      flexDirection: 'row',
      backgroundColor: color.backgroundColorSecondary,
      height: 130,
    },
    input: {
      flex: 1,
      fontSize: RFValue(16, top),
      color: color.fontColorPrimary,
      padding: 0,
      textAlignVertical: 'top',
    },
  });

export default ContentInput;
