import Container from '@/components/common/Container';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { ColorsType } from '@/constants';
import { AuthContext } from '@/context/AuthContext';
import { ThemeContext } from '@/context/CustomThemeContext';
import useAuth from '@/hooks/queries/useAuth';
import { useForm } from '@/hooks/useForm';
import { validateNickname } from '@/utils';
import React, { useContext } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

interface NicknameChangeScreenProps {}

function NicknameChangeScreen({}: NicknameChangeScreenProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { userInfo } = useContext(AuthContext);
  const nicknameChange = useForm({
    initialValue: { nickname: '' },
    validate: validateNickname,
  });
  const { patchProfileMutation } = useAuth();
  const patchProfileHandler = () =>
    patchProfileMutation.mutate(nicknameChange.values.nickname, {
      onSuccess: () => {
        console.log('GGGG');
      },
    });

  return (
    <Container ph="middle">
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Text style={styles.font}>닉네임 변경</Text>
        <InputField
          keyboardType="default"
          placeholder={userInfo?.nickname ?? '변경하실 닉네임을 입력하세요.'}
          error={nicknameChange.errors.nickname}
          touched={nicknameChange.touched.nickname}
          inputMode="text"
          returnKeyType="done"
          {...nicknameChange.getTextInputProps('nickname')}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            label="변경하기"
            onPress={() => {
              Keyboard.dismiss();
              patchProfileHandler();
            }}
          />
        </View>
      </Pressable>
    </Container>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      gap: 8,
    },
    buttonContainer: {
      marginTop: 24,
    },
    font: {
      color: color.fontColorPrimary,
    },
  });

export default NicknameChangeScreen;
