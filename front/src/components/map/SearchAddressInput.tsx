import React, { useContext, useRef } from 'react';
import { StyleSheet, Pressable, PressableProps, Text } from 'react-native';
import { RFValue } from '@/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';

interface SearchAddressInputProps extends PressableProps {
  label?: string;
}

function SearchAddressInput({ label, ...props }: SearchAddressInputProps) {
  const inset = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme, inset.top);
  return (
    <Pressable style={[styles.inputContainer]} {...props}>
      {label ? (
        <Text style={[styles.text, { color: theme.fontColorPrimary }]}>
          {label}
        </Text>
      ) : (
        <Text style={styles.text}>음악들이 궁금한 동네를 검색해보세요!</Text>
      )}
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    inputContainer: {
      backgroundColor: color.backgroundColor,
      paddingHorizontal: 14,
      borderRadius: 16,
      flex: 1,
      borderWidth: 2,
      borderColor: color.BLUE_300,
      justifyContent: 'center',
      height: 45,
    },
    text: {
      fontSize: RFValue(16, top),
      color: color.fontColorSecondary,
    },
  });

export default SearchAddressInput;
