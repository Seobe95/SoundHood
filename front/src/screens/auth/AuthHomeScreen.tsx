import React, { useContext } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { authNavigations, ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import CustomButton from '@/components/common/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigators/auth/AuthNavigator';
import KakaoLoginButton from '@/components/common/KakaoLoginButton';
import AppleLoginButton from '@/components/common/AppleLoginButton';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);
  const isiOS = Platform.OS === 'ios';

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
        {isiOS && <AppleLoginButton />}
        <KakaoLoginButton />
        <CustomButton
          label="이메일 로그인"
          onPress={() => navigation.push(authNavigations.LOGIN)}
        />
        <CustomButton
          label="이메일 회원가입"
          variant="outline"
          onPress={() => navigation.push(authNavigations.REGISTER)}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.text}>지금은 둘러볼래요</Text>
        </Pressable>
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
      flex: 1,
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
    text: {
      fontSize: 12,
      paddingTop: 10,
      color: color.fontColorSecondary,
    },
  });

export default AuthHomeScreen;
