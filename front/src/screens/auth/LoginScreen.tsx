import React, { useContext, useRef } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext';
import CustomButton from '@/components/common/CustomButton';
import { useForm } from '@/hooks/useForm';
import { validateLogin } from '@/utils/validate';
import useAuth from '@/hooks/queries/useAuth';
import { ColorsType, toastMessages } from '@/constants';
import InputField from '@/components/common/InputField';
import { ToastContext } from '@/context/ToastContext';

function LoginScreen() {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const { show } = useContext(ToastContext);
  const { loginMutation } = useAuth();
  const login = useForm({
    initialValue: { email: '', password: '' },
    validate: validateLogin,
  });
  const onPress = async () => {
    Keyboard.dismiss();
    loginMutation.mutate(login.values, {
      onSuccess: result => {
        console.log(result.accessToken);
      },
      onError: error => {
        show({
          message:
            error.response?.data.message || toastMessages.ERROR.UNEXPECT_ERROR,
          time: 'short',
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          keyboardType="email-address"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          returnKeyType="next"
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          secureTextEntry
          ref={passwordRef}
          error={login.errors.password}
          touched={login.touched.password}
          returnKeyType="done"
          textContentType="oneTimeCode"
          {...login.getTextInputProps('password')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="로그인"
          invalid={!login.isValid}
          onPress={onPress}
          isLoading={loginMutation.isPending}
        />
      </View>
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 32,
      paddingHorizontal: 16,
    },
    inputContainer: {
      width: '100%',
      gap: 10,
      marginBottom: 32,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      gap: 10,
    },
  });

export default LoginScreen;
