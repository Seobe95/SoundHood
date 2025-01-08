import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Pressable, PressableProps } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from '@/utils';
import CustomIcon from '../common/CustomIcon';

interface MyPageContentProps extends PressableProps {
  title: string;
  icon: string;
}

function SettingListItem({ title, icon, ...props }: MyPageContentProps) {
  const theme = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(theme, top);

  return (
    <Pressable style={styles.container} {...props}>
      <CustomIcon
        name={icon}
        size={30}
        color={theme.fontColorPrimary}
        style={styles.profileIcon}
      />
      <Text style={styles.font}>{title}</Text>
      <CustomIcon
        name="chevron-forward"
        size={25}
        color={theme.fontColorPrimary}
        style={styles.chevron}
      />
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileIcon: {
      marginRight: 8,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: RFValue(20, top),
    },
    chevron: {
      marginLeft: 'auto',
    },
  });

export default SettingListItem;
