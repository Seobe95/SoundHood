import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { RFValue } from '@/utils';
import React, { ReactNode, useContext } from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderRightButtonProps extends PressableProps {
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
}

function HeaderRightButton({
  icon,
  label,
  disabled = false,
  ...props
}: HeaderRightButtonProps) {
  const theme = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyle(theme, top);

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        pressed
          ? styles.pressedHeaderRightContainer
          : styles.headerRightContainer,
        disabled && styles.disabledButton,
      ]}
      {...props}>
      {!label && icon}
      {label && !icon && <Text style={[styles.font]}>{label}</Text>}
    </Pressable>
  );
}

const makeStyle = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    headerRightContainer: {
      opacity: 1,
    },
    pressedHeaderRightContainer: {
      opacity: 0.2,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: RFValue(18, top),
    },
    disabledButton: {
      opacity: 0.4,
    },
  });

export default HeaderRightButton;
