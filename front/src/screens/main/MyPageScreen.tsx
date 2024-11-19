import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '@/components/common/CustomButton.tsx';
import useAuth from '@/hooks/queries/useAuth.ts';
import { logout } from '@/api';

interface MyPageScreenProps {}

function MyPageScreen({}: MyPageScreenProps) {
  const { logoutMutation } = useAuth();
  return (
    <View>
      <CustomButton
        label={'로그아웃'}
        onPress={() => {
          logoutMutation.mutate({});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default MyPageScreen;
