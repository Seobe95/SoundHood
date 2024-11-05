import React, { forwardRef, useContext, useRef } from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext';
import { ColorsType } from '@/constants';
import { mergeRefs } from '@/utils/common';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps extends TextInputProps {}

const deviceHeight = Dimensions.get('screen').height;

const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ ...props }: SearchBarProps, ref) => {
    const themeColor = useContext(ThemeContext);
    const styles = makeStyles(themeColor);
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View style={[styles.container]}>
          <Icon name="search" size={20} style={styles.icon} />
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            placeholderTextColor={themeColor.fontColorSecondary}
            style={[styles.input]}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            onSubmitEditing={() => Keyboard.dismiss()}
            returnKeyType="search"
            {...props}
          />
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
      borderRadius: 16,
      padding: deviceHeight > 700 ? 16 : 10,
      flexDirection: 'row',
      backgroundColor: color.backgroundColor,
      // justifyContent: 'center',
    },
    icon: {
      paddingRight: 10,
      color: color.fontColorSecondary,
    },
    input: {
      flex: 1,
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

export default SearchBar;
