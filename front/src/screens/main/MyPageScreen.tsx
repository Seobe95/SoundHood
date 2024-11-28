import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '@/components/common/CustomButton.tsx';
import useAuth from '@/hooks/queries/useAuth.ts';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import CustomActionSheet from '@/components/common/CustomActionSheet.tsx';
import useCustomActionSheetStore from '@/stores/useCustomActionSheetStore.ts';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';

interface MyPageScreenProps {}

export type BottomSheetRef = {
  show: () => void;
  hide: () => void;
};

function MyPageScreen({}: MyPageScreenProps) {
  const { logoutMutation } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { show } = useCustomActionSheetStore();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={{ height: '100%' }}>
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
                id: '95ceb85e-041c-471b-97d5-ffc7609657bc',
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
