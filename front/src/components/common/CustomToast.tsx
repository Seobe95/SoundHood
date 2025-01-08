import { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Animated, Text, Dimensions, View } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';

type CustomToastProps = {
  message: string;
  time: 'long' | 'short';
};

const deviceHeight = Dimensions.get('window').height;

function CustomToast({ time, message }: CustomToastProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const durationTime = time === 'long' ? 4000 : 2500;
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, durationTime);

    return () => {
      clearTimeout(timer);
    };
  }, [fadeAnimation, time]);

  return (
    <Animated.View
      style={[
        styles.container,
        { bottom: deviceHeight / 6, opacity: fadeAnimation },
      ]}>
      <Text style={styles.font}>{message}</Text>
    </Animated.View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColorSecondary,
      padding: 8,
      position: 'absolute',
      zIndex: 9999,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRadius: 8,
      left: 16,
      right: 16,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default CustomToast;
