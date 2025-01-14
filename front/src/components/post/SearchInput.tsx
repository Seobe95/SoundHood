import React, { useContext, useRef } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from '@/utils';
import { PostStackParamList } from '@/navigators/post/PostNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface SearchBarProps extends TextInputProps {}

const deviceHeight = Dimensions.get('screen').height;

function SearchBar({ ...props }: SearchBarProps) {
  const themeColor = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(themeColor, top);
  const innerRef = useRef<TextInput | null>(null);
  const navigation = useNavigation<StackNavigationProp<PostStackParamList>>();

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable style={styles.container} onPress={handlePressInput}>
      <View style={[styles.inputContainer]}>
        <Icon name="search" size={20} style={styles.icon} />
        <TextInput
          ref={innerRef}
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
      <Pressable
        style={({ pressed }) =>
          pressed ? styles.pressedCancelButton : styles.cancelButton
        }
        onPress={() => navigation.pop()}>
        <Text style={styles.cancelButtonFont}>취소</Text>
      </Pressable>
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: 16,
      padding: deviceHeight > 700 ? 16 : 10,
      backgroundColor: color.backgroundColor,
    },
    icon: {
      paddingRight: 10,
      color: color.fontColorSecondary,
    },
    input: {
      flex: 1,
      fontSize: RFValue(16, top),
      color: color.fontColorPrimary,
      padding: 0,
    },
    cancelButton: {
      justifyContent: 'center',
      paddingHorizontal: 10,
      padding: 16,
    },
    pressedCancelButton: {
      justifyContent: 'center',
      paddingHorizontal: 10,
      padding: 16,
      opacity: 0.2,
    },
    cancelButtonFont: {
      color: color.fontColorPrimary,
      fontSize: RFValue(16, top),
    },
  });

export default SearchBar;
