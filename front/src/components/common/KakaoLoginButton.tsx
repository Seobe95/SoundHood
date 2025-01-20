import { RFValue } from '@/utils';
import { login } from '@react-native-seoul/kakao-login';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface KakaoLoginButtonProps {}

function KakaoLoginButton({}: KakaoLoginButtonProps) {
  const [result, setResult] = useState<string>('');
  const { top } = useSafeAreaInsets();
  const styles = makeStyle(top);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      const log = JSON.stringify(token);
      setResult(JSON.stringify(token));
      console.log(log);
    } catch (err) {
      console.error('login err', err);
    }
  };

  return (
    <Pressable style={styles.container} onPress={signInWithKakao}>
      <View style={styles.logoConatiner}>
        <Image
          source={require('@/assets/logo/kakao_logo.png')}
          resizeMethod="resize"
          resizeMode="contain"
          style={styles.kakaoLogo}
        />
      </View>
      <View style={styles.labelConatiner}>
        <Text style={styles.buttonFont}>카카오 로그인</Text>
      </View>
    </Pressable>
  );
}

const makeStyle = (top: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#FEE500',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 7,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    logoConatiner: {
      flex: 0,
    },
    kakaoLogo: {
      width: 24,
    },
    labelConatiner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 24,
    },
    buttonFont: {
      fontSize: RFValue(16, top),
      fontWeight: 'bold',
      color: '#000000',
      opacity: 0.85,
    },
  });

export default KakaoLoginButton;
