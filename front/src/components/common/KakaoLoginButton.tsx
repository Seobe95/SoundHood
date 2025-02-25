import { toastMessages } from '@/constants';
import { ToastContext } from '@/context/ToastContext';
import useAuth from '@/hooks/queries/useAuth';
import { RFValue } from '@/utils';
import { login } from '@react-native-seoul/kakao-login';
import React, { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface KakaoLoginButtonProps {}

function KakaoLoginButton({}: KakaoLoginButtonProps) {
  const { top } = useSafeAreaInsets();
  const styles = makeStyle(top);
  const { kakaoSignInMutation } = useAuth();
  const { show } = useContext(ToastContext);
  const signInWithKakao = async () => {
    try {
      const { accessToken } = await login();
      return accessToken;
    } catch (error) {
      console.log(error);
      throw new Error('소셜 로그인 실패');
    }
  };

  const sendKakaoAccessTokenToServer = async (accessToken: string) => {
    kakaoSignInMutation.mutate(
      { token: accessToken },
      {
        onSuccess: () => {
          show({ message: toastMessages.LOGIN.SUCCESS, time: 'long' });
        },
      },
    );
  };

  const handleSignIn = async () => {
    try {
      const accessToken = await signInWithKakao();
      const response = await sendKakaoAccessTokenToServer(accessToken);
      console.log(response);
    } catch (error) {
      throw new Error('에러입니다.');
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedConatiner,
      ]}
      onPress={handleSignIn}>
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
      height: 44,
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    pressedConatiner: { opacity: 0.6 },
    logoConatiner: {
      marginRight: 8,
    },
    kakaoLogo: {
      width: 18,
    },
    labelConatiner: {
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
