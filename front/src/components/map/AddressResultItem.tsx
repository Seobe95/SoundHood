import React, { useContext } from 'react';
import { StyleSheet, Text, Pressable, PressableProps } from 'react-native';
import { ColorsType } from '@/constants';
import { RFValue } from '@/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';

interface AddressResultItemProps extends PressableProps {
  addressName?: string;
}

function AddressResultItem({ addressName, ...props }: AddressResultItemProps) {
  const { top } = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme, top);
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? styles.pressedResultContainer : styles.resultContainer
      }
      {...props}>
      <Text style={styles.resultText}>{addressName}</Text>
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    resultContainer: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    pressedResultContainer: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: color.pressedBackgroundColorSecondary,
    },
    resultText: {
      fontSize: RFValue(16, top),
      color: color.fontColorPrimary,
    },
  });

export default AddressResultItem;
