import React, { useContext, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ColorsType } from '../../constants';
import { ThemeContext } from '../../context/CustomThemeContext';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import { useForm } from '../../hooks/useForm';
import { validateRegister } from '../../utils/validate';

interface RegisterScreenProps {}

function RegisterScreen({}: RegisterScreenProps) {
  const themeColor = useContext(ThemeContext);
  const styles = makeStyles(themeColor);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passwordCheckRef = useRef<TextInput>(null);
  const register = useForm({
    initialValue: { email: '', password: '', passwordCheck: '' },
    validate: validateRegister,
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          keyboardType="email-address"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          error={register.errors.email}
          touched={register.touched.email}
          blurOnSubmit={false}
          {...register.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          secureTextEntry
          ref={passwordRef}
          error={register.errors.password}
          touched={register.touched.password}
          {...register.getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          secureTextEntry
          ref={passwordCheckRef}
          error={register.errors.passwordCheck}
          touched={register.touched.passwordCheck}
          {...register.getTextInputProps('passwordCheck')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="로그인" />
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
