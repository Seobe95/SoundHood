import React, { useContext, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { useForm } from '@/hooks/useForm';
import { validateRegister } from '@/utils/validate';
import useAuth from '@/hooks/queries/useAuth';
import Config from 'react-native-config';

interface RegisterScreenProps {}

function RegisterScreen({}: RegisterScreenProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passwordCheckRef = useRef<TextInput>(null);
  const { signupMutation, loginMutation } = useAuth();
  const signup = useForm({
    initialValue: { email: '', password: '', passwordCheck: '' },
    validate: validateRegister,
  });
  const onPress = async () => {
    const { email, password } = signup.values;
    console.log(email, password, Config.API_URI);
    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => loginMutation.mutate({ email, password }),
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          keyboardType="email-address"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          error={signup.errors.email}
          touched={signup.touched.email}
          blurOnSubmit={false}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          secureTextEntry
          ref={passwordRef}
          error={signup.errors.password}
          touched={signup.touched.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          secureTextEntry
          ref={passwordCheckRef}
          error={signup.errors.passwordCheck}
          touched={signup.touched.passwordCheck}
          {...signup.getTextInputProps('passwordCheck')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="회원가입"
          onPress={onPress}
          invalid={!signup.isValid}
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

export default RegisterScreen;
