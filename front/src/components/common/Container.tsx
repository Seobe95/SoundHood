import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, ViewProps, View } from 'react-native';

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  ph?: 'none' | 'small' | 'middle' | 'large';
}

function Container({ children, ph = 'small', ...props }: ContainerProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  return (
    <SafeAreaView style={[styles.container]}>
      <View {...props} style={[styles[`${ph}PH`]]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      flex: 1,
    },
    nonePH: {
      paddingHorizontal: 0,
    },
    smallPH: {
      paddingHorizontal: 8,
    },
    middlePH: {
      paddingHorizontal: 16,
    },
    largePH: {
      paddingHorizontal: 32,
    },
  });

export default Container;
