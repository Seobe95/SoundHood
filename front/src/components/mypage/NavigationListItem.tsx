import React, { useContext } from 'react';
import { StyleSheet, Pressable, PressableProps } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomIcon from '../common/CustomIcon';
import CustomFont from '../common/CustomFont';

interface MyPageContentProps extends PressableProps {
  title: string;
  icon: string;
}

function NavigationListItem({ title, icon, ...props }: MyPageContentProps) {
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
      <CustomFont fontSize={20}>{title}</CustomFont>
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
    chevron: {
      marginLeft: 'auto',
    },
  });

export default NavigationListItem;
