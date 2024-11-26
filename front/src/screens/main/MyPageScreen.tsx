import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '@/components/common/CustomButton.tsx';
import useAuth from '@/hooks/queries/useAuth.ts';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';

interface MyPageScreenProps {}

function MyPageScreen({}: MyPageScreenProps) {
  const { logoutMutation } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
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
              id: '95ceb85e-041c-471b-97d5-ffc7609657bc',
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default MyPageScreen;
