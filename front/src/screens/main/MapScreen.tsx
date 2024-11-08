import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

interface MapScreenProps {}

function MapScreen({}: MapScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NaverMapView
      style={styles.container}
      isNightModeEnabled={isDarkMode}
      mapType="Navi"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
