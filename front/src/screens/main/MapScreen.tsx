import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React from 'react';
import { StyleSheet } from 'react-native';

interface MapScreenProps {}
function MapScreen({}: MapScreenProps) {
  return <NaverMapView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
