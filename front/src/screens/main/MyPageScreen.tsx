import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '@/components/common/CustomButton.tsx';
import useAuth from '@/hooks/queries/useAuth.ts';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import useCustomActionSheetStore from '@/stores/useCustomActionSheetStore.ts';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';

interface MyPageScreenProps {}

function MyPageScreen({}: MyPageScreenProps) {
  const { logoutMutation } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { show } = useCustomActionSheetStore();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <View>
        <CustomButton
          label={'로그아웃'}
          onPress={() => {
            logoutMutation.mutate({});
          }}
        />
        <CustomButton
          label={'디테일 페이지 이동'}
          onPress={() => {
            navigation.navigate('DetailNavigator', {
              screen: 'Detail',
              params: {
                id: '886355d7-5fc5-46e1-aa53-8b0cb81a0ce9',
              },
            });
          }}
        />
        <CustomButton label={'바텀 탭'} onPress={show} />
      </View>
    </View>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: color.backgroundColor,
    },
    font: {
      color: color.fontColorPrimary,
      fontSize: 20,
    },
  });

export default MyPageScreen;
