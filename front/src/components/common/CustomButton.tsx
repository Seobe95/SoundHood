import { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PressableProps,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from '@/utils';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'large' | 'medium';
  variant?: 'filled' | 'outline' | 'spotify';
  invalid?: boolean;
  isLoading?: boolean;
}

function CustomButton({
  label,
  size = 'large',
  variant = 'filled',
  invalid = false,
  isLoading = false,
  ...props
}: CustomButtonProps) {
  const themeColor = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const styles = makeStyles(themeColor, top);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        invalid && styles.invaildFilled,
      ]}
      disabled={invalid}
      {...props}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'#ffffff'} />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          {variant === 'spotify' && (
            <Image
              source={require('@/assets/logo/spotify.png')}
              resizeMode={'contain'}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
          )}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              invalid && styles.invalidText,
            ]}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      justifyContent: 'center',
    },
    large: {
      width: '100%',
      height: 44,
      alignItems: 'center',
    },
    medium: {
      width: '47%',
      paddingVertical: 12,
      alignItems: 'center',
    },
    filled: {
      backgroundColor: color.BLUE_400,
    },
    spotify: {
      backgroundColor: '#1ed760',
    },
    invaildFilled: {
      backgroundColor: color.backgroundColorSecondary,
    },
    outline: {
      borderColor: color.BLUE_400,
      borderWidth: 1,
    },
    filledPressed: {
      backgroundColor: color.BLUE_400,
      opacity: 0.6,
    },
    outlinePressed: {
      borderColor: color.BLUE_200,
      borderWidth: 1,
    },
    spotifyPressed: {
      opacity: 0.5,
      backgroundColor: '#1ed760',
    },
    filledText: {
      color: '#FFFFFF',
    },
    outlineText: {
      color: color.BLUE_400,
    },
    spotifyText: {
      color: '#ffffff',
    },
    text: {
      fontSize: RFValue(16, top),
      fontWeight: 'bold',
    },
    invalidText: {
      color: color.fontColorSecondary,
    },
  });

export default CustomButton;
