import CustomButton from '@/components/common/CustomButton';
import CustomFont from '@/components/common/CustomFont';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AuthRequiredScreenProps {
  instruction: string;
  handleNavigate: () => void;
}

function AuthRequiredScreen({
  handleNavigate,
  instruction,
}: AuthRequiredScreenProps) {
  return (
    <View style={styles.container}>
      <CustomFont fontSize={16}>{instruction}</CustomFont>
      <CustomButton label="로그인" onPress={handleNavigate} size="medium" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 16,
  },
});

export default AuthRequiredScreen;
