import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { authNavigations, ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import CustomButton from '@/components/common/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigators/auth/AuthNavigator';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/logo/logo.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="이메일 로그인"
          onPress={() => navigation.push(authNavigations.LOGIN)}
        />
        <CustomButton
          label="이메일 회원가입"
          variant="outline"
          onPress={() => navigation.push(authNavigations.REGISTER)}
        />
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    imageContainer: {
      flex: 1.5,
      width: Dimensions.get('screen').width / 2,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      gap: 10,
    },
  });

export default AuthHomeScreen;
