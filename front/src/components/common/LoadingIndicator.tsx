import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
  size: 'large' | 'small' | number;
  color: string;
}

function LoadingIndicator({
  size = 'small',
  color = '#ffffff',
}: LoadingIndicatorProps) {
  const indicatorOptions = { size, color };
  return (
    <SafeAreaView style={[styles.container]}>
      <ActivityIndicator {...indicatorOptions} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: '#333333',
    opacity: 0.6,
  },
});

export default LoadingIndicator;
