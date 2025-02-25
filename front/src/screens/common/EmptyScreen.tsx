import CustomFont from '@/components/common/CustomFont';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface EmptyScreenProps {
  informationMessage: string;
}

function EmptyScreen({ informationMessage }: EmptyScreenProps) {
  return (
    <View style={styles.empty}>
      <CustomFont>{informationMessage}</CustomFont>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyScreen;
