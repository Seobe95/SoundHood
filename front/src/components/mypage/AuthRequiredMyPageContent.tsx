import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '@/components/common/CustomButton.tsx';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType, rootStackNavigations } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';

type AuthRequiredMyPageContentProps = {};

function AuthRequiredMyPageContent({}: AuthRequiredMyPageContentProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList,
        typeof rootStackNavigations.MAIN_TAP
      >
    >();
  const handleLoginButton = () => {
    navigation.navigate('AuthNavigator', {
      screen: 'AuthHome',
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.font}>로그인이 필요합니다.</Text>
      <CustomButton label={'로그인'} onPress={handleLoginButton} />
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      gap: 16,
      padding: 16,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: 20,
    },
  });

export default AuthRequiredMyPageContent;
