import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MapScreenProps {}

function MapScreen({}: MapScreenProps) {
  return (
    <SafeAreaView>
      <NaverMapView style={{ width: '100%', height: '100%' }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapScreen;
