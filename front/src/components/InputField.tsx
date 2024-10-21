import React, { forwardRef, useContext, useRef } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { ThemeContext } from '../context/CustomThemeContext';
import { ColorsType } from '../constants';
import { mergeRefs } from '../utils/common';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ disabled = false, error, touched, ...props }: InputFieldProps, ref) => {
    const themeColor = useContext(ThemeContext);
    const styles = makeStyles(themeColor);
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            placeholderTextColor={themeColor.fontColorSecondary}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={[styles.disabledText]}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: 3,
      padding: deviceHeight > 700 ? 16 : 10,
    },
    input: {
      fontSize: 16,
      color: color.fontColorPrimary,
      padding: 0,
    },
    inputError: {
      borderColor: color.PINK_500,
    },
    disabled: {
      borderColor: color.PINK_500,
    },
    disabledText: {
      color: color.PINK_500,
      marginTop: 8,
    },
  });

export default InputField;
